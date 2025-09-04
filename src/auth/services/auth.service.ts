import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '@/user/user.service';
import { TokenService } from './token.service';
import { User } from '@/user/entities/user.entity';
import { LoginDto, LoginResponseDto } from '../dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) {}
  
  async comparePassword(password: string, pwdHash: string): Promise<boolean> {
    return bcrypt.compare(password, pwdHash);
  }

  async login(login: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userService.findByEmail(login.email);
    if (!user) throw new UnauthorizedException('Invalid Credentials');

    const isPasswordValid = await this.comparePassword(login.password, user.pwdHash);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid Credentials');

    const token = await this.tokenService.signAccessToken({
      email: user.email,
      sub: user.id,
    });

    return {
      token: 'token',
      refreshToken: 'refreshToken',
      tokenExpires: 1000,
      user: user
    };
  }

  async register() {}

  async confirmEmail () {}

  async forgotPassword () {}

  async resetPassword () {}

  async me () {}

  async update () {}
  
  async refreshToken () {}

  async logout () {}

}
