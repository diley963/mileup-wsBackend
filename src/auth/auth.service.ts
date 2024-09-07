import { Injectable } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../usuarios/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    nombre_usuario: string,
    contrasena: string,
  ): Promise<Usuario | null> {
    const user = await this.usuariosService.findByUsername(nombre_usuario);
    if (user && user.contrasena === contrasena) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.nombre_usuario, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
