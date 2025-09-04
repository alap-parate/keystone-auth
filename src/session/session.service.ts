import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { SessionRepository } from './repository/session.repository';
import { TokenService } from '@/auth/services/token.service';
import { RevokeSessionDto } from './dto/revoke-session.dto';
import { RevokeSessionsDto } from './dto/revoke-sessions.dto';
import { SessionListResponseDto } from './dto/session-list-response.dto';
import { SessionListDto } from './dto/session-list.dto';

@Injectable()
export class SessionService {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly tokenService: TokenService,
  ) {}

  async create(userId: string, ipAddress: string, userAgent: string): Promise<string> {
    const { jti, opaqueToken, tokenHash, expiresAt } = await this.tokenService.createOpaqueToken();
    try{
      await this.sessionRepository.create({
        user: { id: userId },
        jti,
        refreshTokenHash: tokenHash,
        ipAddress,
        userAgent,
        expiresAt,
      });
      return opaqueToken;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create session');
    }
  }

  async rotateToken( jti: string, refreshToken: string ): Promise<string> {
    
    const session = await this.sessionRepository.findByJti(jti);
    if(!session) {
      throw new UnauthorizedException('Session not found');
    }

    await this.tokenService.verifyOpaqueToken(refreshToken, session.refreshTokenHash, session.revokedAt, session.expiresAt);
    
    const { jti: newJti, opaqueToken, tokenHash, expiresAt } = await this.tokenService.createOpaqueToken();
    session.jti = newJti;
    session.refreshTokenHash = tokenHash;
    session.expiresAt = expiresAt;
    await this.sessionRepository.update(session.id, session);
    return opaqueToken;
  }

  async list(listDto: SessionListDto): Promise<SessionListResponseDto[]> {
    return this.sessionRepository.findByUserId(listDto.userId);
  }

  async revoke(revokeDto: RevokeSessionDto): Promise<void> {
    return await this.sessionRepository.removeById(revokeDto.id);
  }

  async revokeAll(revokeAllDto: RevokeSessionsDto): Promise<void> {
    return await this.sessionRepository.removeByUserId(revokeAllDto.userId);
  }
}
