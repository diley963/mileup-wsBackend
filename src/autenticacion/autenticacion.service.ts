import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../usuario/usuario.entity';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AutenticacionService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validarUsuario(
    correo_electronico: string,
    contrasena: string,
  ): Promise<Usuario | null> {
    const user = await this.usuarioService.obtenerPorCorreo(correo_electronico);
    if (user && user.contrasena === contrasena) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.nombre_usuario, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      userId: user.id,
    };
  }
}
