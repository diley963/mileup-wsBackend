import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsuariosService } from '../usuarios/usuarios.service'; // Servicio para interactuar con la base de datos
import { Usuario } from '../usuarios/usuario.entity'; // Entidad de Usuario

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usuariosService: UsuariosService, // Inyectamos el servicio de usuarios
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:"123456", // Usamos la clave secreta desde el servicio de configuración
    });
  }

  // Este método se llama automáticamente para validar el token
  async validate(payload: any): Promise<Usuario> {
    // Puedes hacer validaciones adicionales aquí, como consultar el usuario por ID
    const usuario = await this.usuariosService.findOne(payload.sub);

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    return usuario; // Retornamos el usuario validado
  }
}
