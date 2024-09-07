import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '@nestjs/config'; // Importar ConfigService para acceder a las variables de entorno
import { Injectable } from '@nestjs/common';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { PassportStrategy } from '@nestjs/passport';
import { Usuario } from '../usuario/usuario.entity'; // Entidad de Usuario
import { UsuarioService } from '../usuario/usuario.service'; // Servicio para interactuar con la base de datos

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usuarioService: UsuarioService, // Inyectamos el servicio de usuario
    private readonly configService: ConfigService, // Inyectamos ConfigService para acceder a JWT_SECRET
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'), // Usamos la clave secreta desde la variable de entorno
    });
  }

  // Este método se llama automáticamente para validar el token
  async validate(payload: JwtPayloadDto): Promise<Usuario> {
    const usuario = await this.usuarioService.obtenerUno(payload.sub);

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    return usuario;
  }
}
