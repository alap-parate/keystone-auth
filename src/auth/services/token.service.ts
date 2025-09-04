import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService as Jwt } from '@nestjs/jwt';
import { ConfigType } from "@nestjs/config";
import { randomBytes, createHmac } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { Algorithm } from 'jsonwebtoken';
import configuration from "@/config/configuration";

export interface JwtPayload {
    email: string;
    sub: string;
    roles?: string[];
    [key: string]: any;
}

@Injectable()
export class TokenService {
    private readonly accessTokenSecret: string;
    private readonly accessTokenExpiresIn: number;
    private readonly refreshTokenSecret: string;
    private readonly refreshTokenExpiresIn: number;
    private readonly algorithm: Algorithm;
    private readonly issuer: string;
    private readonly audience: string;

    constructor(
        @Inject(configuration.KEY)
        config: ConfigType<typeof configuration>,
        private readonly jwt: Jwt,
    ) {
        this.accessTokenSecret = config.auth.secret;
        this.accessTokenExpiresIn = config.auth.expiresIn;
        this.refreshTokenSecret = config.auth.refreshSecret;
        this.refreshTokenExpiresIn = config.auth.refreshExpiresIn;
        this.algorithm = config.auth.algorithm as Algorithm;
        this.issuer = config.auth.issuer;
        this.audience = config.auth.audience;
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

  async createOpaqueToken(): Promise<{
    opaqueToken: string;
    jti: string;
    tokenHash: string;
    expiresAt: Date;
  }> {
    const jti = uuidv4();
    const tokenRandom = randomBytes(32).toString('hex');
    const tokenHash = this.hashToken(tokenRandom);
    const opaqueToken = Buffer.from(`${jti}.${tokenRandom}`).toString('base64url');
    const expiresAt = new Date(Date.now() + this.refreshTokenExpiresIn * 1000);
    return {
        opaqueToken,
        jti,
        tokenHash,
        expiresAt
    }
}

  hashToken(token: string) {
    return createHmac('sha256', this.refreshTokenSecret).update(token).digest('hex');
  }

  async verifyOpaqueToken(opaqueToken: string, refreshTokenHash: string, revokedAt: Date, expiresAt: Date) {
    const decoded = Buffer.from(opaqueToken, 'base64url').toString('utf8');
    const [jti, tokenRandom] = decoded.split('.');
    if(!jti || !tokenRandom) throw new UnauthorizedException('Malformed Token');

    if (revokedAt) throw new UnauthorizedException('Revoked token');
    if (expiresAt < new Date()) throw new UnauthorizedException('Expired token');

    const tokenHash = this.hashToken(tokenRandom);
    if (tokenHash !== refreshTokenHash) throw new UnauthorizedException('Invalid token');

    return true
  }
  
}