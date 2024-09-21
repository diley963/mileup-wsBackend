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
    const { nombre_usuario, contrasena } = loginDto;
    const user = await this.autenticacionService.validarUsuario(
      nombre_usuario,
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
