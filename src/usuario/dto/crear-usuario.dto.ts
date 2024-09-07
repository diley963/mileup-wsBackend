import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';

// DTO para crear un usuario
export class CrearUsuarioDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
  @MinLength(3, {
    message: 'El nombre de usuario debe tener al menos 3 caracteres',
  })
  nombre_usuario: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  contrasena: string;

  @IsBoolean()
  esta_bloqueado: boolean;
}
