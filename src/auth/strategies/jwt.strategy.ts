import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';
import { Algorithm } from 'jsonwebtoken';
import configuration from '@/config/configuration';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(JwtStrategy, 'jwt') {
  constructor(
    @Inject(configuration.KEY)
    config: ConfigType<typeof configuration>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.auth.secret,
      algorithms: [config.auth.algorithm as Algorithm],
    });
  }

  validate(payload: any): any {
    return { userId: payload.sub, email: payload.email };
  }
}
