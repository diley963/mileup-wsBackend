import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('autenticacion')
@Controller('autenticacion')
export class AutenticacionController {
  constructor(private autenticacionService: AutenticacionService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { correo_electronico, contrasena } = loginDto;
    const user = await this.autenticacionService.validarUsuario(
      correo_electronico,
      contrasena,
    );

    if (!user) {
      throw new HttpException(
        'Usuario o contraseña incorrectos',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return this.autenticacionService.login(user);
  }
}
