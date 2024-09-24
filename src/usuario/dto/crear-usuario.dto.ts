import { IsString, IsNotEmpty, IsOptional, IsEmail, IsBoolean, IsUUID, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearUsuarioDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
  @MinLength(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' })
  @ApiProperty({ description: 'El nombre del usuario', example: 'usuario123' })
  nombreUsuario: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre completo es obligatorio' })
  @ApiProperty({ description: 'Nombre completo del usuario', example: 'Juan Pérez' })
  nombreCompleto: string;

  @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  @ApiProperty({ description: 'Correo electrónico del usuario', example: 'juan.perez@example.com' })
  correoElectronico: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @ApiProperty({ description: 'Contraseña del usuario', example: 'password123' })
  contrasena: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Número de teléfono del usuario', example: '123456789', required: false })
  telefono?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ description: 'Estado de bloqueo del usuario', example: false })
  estaBloqueado?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ description: 'Estado activo del usuario', example: true })
  estaActivo?: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'URL de la imagen de perfil del usuario', example: 'http://example.com/perfil.jpg' })
  urlImagenPerfil?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Dirección del usuario', example: 'Calle 123, Ciudad' })
  direccion?: string;

}
