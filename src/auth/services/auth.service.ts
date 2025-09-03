import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '@/user/user.service';
import { User } from '@/user/entities/user.entity';
import { LoginDto } from '../dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService
  ) {}
  
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid Credentials');

    const isPasswordValid = await bcrypt.compare(password, user.pwdHash);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid Credentials');

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = { email: user.email, sub: user.id };
  }
}
