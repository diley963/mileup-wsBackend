import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// DTO para crear un usuario
export class CrearUsuarioDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
  @ApiProperty({ description: 'El nombre del usuario' })
  @MinLength(3, {
    message: 'El nombre de usuario debe tener al menos 3 caracteres',
  })
  nombreUsuario: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @ApiProperty({ description: 'Contraseña del usuario' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  contrasena: string;

  @IsBoolean()
  esta_bloqueado: boolean;
}
