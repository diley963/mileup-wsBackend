import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { nombre_usuario, contrasena } = loginDto;
    const user = await this.authService.validateUser(nombre_usuario, contrasena);

    if (!user) {
      throw new HttpException('Usuario o contraseña incorrectos', HttpStatus.UNAUTHORIZED);
    }

    return this.authService.login(user);
  }
}
