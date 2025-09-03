import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService as Jwt } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config";
import { randomBytes, createHmac } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from "typeorm";
import { Algorithm } from 'jsonwebtoken';
import { RefreshToken } from "../entities/refresh-token.entity";

export interface JwtPayload {
    email: string;
    sub: string;
    roles?: string[];
    [key: string]: any;
}

@Injectable()
export class JwtService {
    private readonly accessTokenSecret: string;
    private readonly accessTokenExpiresIn: number;
    private readonly refreshTokenSecret: string;
    private readonly refreshTokenExpiresIn: number;
    private readonly algorithm: Algorithm;
    private readonly issuer: string;
    private readonly audience: string;

    constructor(
        private readonly jwt: Jwt,
        private readonly configService: ConfigService,
        private readonly refreshTokenRepository: Repository<RefreshToken>,
    ) {
        const config = this.configService.get('auth');
        this.accessTokenSecret = config.secret;
        this.accessTokenExpiresIn = config.expiresIn;
        this.refreshTokenSecret = config.refreshSecret;
        this.refreshTokenExpiresIn = config.refreshExpiresIn;
        this.algorithm = config.algorithm;
        this.issuer = config.issuer;
        this.audience = config.audience;
    }

  async findByJti(jti: string): Promise<RefreshToken> {
    const session = await this.refreshTokenRepository.findOne({ 
        where: { 
            jti: jti,
            isValid: true
        },
        relations: ['session' , 'session.user']
    });
    if (!session) throw new UnauthorizedException('Session not found');
    return session;
  }

  async signAccessToken(payload: JwtPayload): Promise<string> {
    const jti = uuidv4();
    return this.jwt.sign({ ...payload }, { 
        jwtid: jti,
        algorithm: this.algorithm,
        issuer: this.issuer,
        audience: this.audience,
        secret: this.accessTokenSecret, 
        expiresIn: this.accessTokenExpiresIn
    });
  }

  async createOpaqueToken() {
    const jti = uuidv4();
    const tokenRandom = randomBytes(32).toString('hex');
    const tokenHash = createHmac('sha256', this.refreshTokenSecret).update(tokenRandom).digest('hex');
    const opaqueToken = Buffer.from(`${jti}.${tokenRandom}`).toString('base64url');
    const expiresAt = new Date(Date.now() + this.refreshTokenExpiresIn * 1000);
    return {
        opaqueToken,
        jti,
        tokenHash,
        expiresAt
    }
}

  async verifyRefreshToken(opaqueToken: string) {
    const decoded = Buffer.from(opaqueToken, 'base64url').toString('utf8');
    const [jti, tokenRandom] = decoded.split('.');
    if(!jti || !tokenRandom) throw new UnauthorizedException('Malformed Token');

    const session = await this.findByJti(jti);

    if (session.revokedAt) throw new UnauthorizedException('Revoked token');
    if (session.expiresAt < new Date()) throw new UnauthorizedException('Expired token');
    if (!session.isValid) throw new UnauthorizedException('Invalid token');

    const tokenHash = createHmac('sha256', this.refreshTokenSecret).update(tokenRandom).digest('hex');
    if (tokenHash !== session.refreshTokenHash) throw new UnauthorizedException('Invalid token');

    return {
        session
    }
  }
  
  async rotateRefreshToken(oldOpaqueToken: string) {
    try {
        const { session } = await this.verifyRefreshToken(oldOpaqueToken);
        session.isValid = false;
        session.revokedAt = new Date();
        const result = await this.refreshTokenRepository.manager.transaction(async (manager) => {
            await manager.save(session);
            
            const newOpaqueToken = await this.createOpaqueToken();
        
            await manager.save({
                jti: newOpaqueToken.jti,
                refreshTokenHash: newOpaqueToken.tokenHash,
                expiresAt: newOpaqueToken.expiresAt
            });
        
            const newAccessToken = await this.signAccessToken({
                email: session.session.user.email,
                sub: session.session.user.id,
            });
    
            return {
                newAccessToken,
                newOpaqueToken
            };
        });
    
        return result;
    } catch (e) {
        throw new UnauthorizedException('Session expired please login again');
    }
  }

  
}