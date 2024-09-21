import { IsBoolean, IsString, MinLength } from 'class-validator';

// DTO para actualizar un usuario
export class ActualizarUsuarioDto {
  @IsString()
  @MinLength(3, {
    message: 'El nombre de usuario debe tener al menos 3 caracteres',
  })
  nombreUsuario: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  contrasena?: string;

  @IsBoolean()
  esta_bloqueado?: boolean;
}
