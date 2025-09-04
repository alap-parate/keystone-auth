import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LoginDto } from './dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtService } from './services/token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) {}

  @Post('/register')
  create(@Body() loginDto: LoginDto) {
    return this.authService.create(loginDto);
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  findAll() {
    return this.authService.findAll();
  }

  @Post('/logout')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Post('/refresh')
  update(@Param('id') id: string, @Body() updateAuthDto: RefreshTokenDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  // @Post('/2fa/setup')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }

  // @Post('/2fa/verify')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }

  @Post('/forgot-password')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }

  @Post('/reset-password')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }

}
