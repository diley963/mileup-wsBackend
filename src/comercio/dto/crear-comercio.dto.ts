import { IsNotEmpty, IsString, IsOptional, IsArray, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearComercioDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Nombre del establecimiento', example: 'Mi Tienda' })
  nombreEstablecimiento: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Dirección del comercio', example: 'Calle 123, Ciudad' })
  direccion: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Número de teléfono del comercio', example: '123456789' })
  telefono: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'NIT del comercio', example: '1234567890-1' })
  nit: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({ 
    description: 'Ubicación del comercio (latitud y longitud)', 
    example: [4.60971, -74.08175], 
    type: [Number] 
  })
  ubicacion?: number[]; // [latitud, longitud]

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ description: 'Estado activo del comercio', example: true })
  estaActivo?: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'URL de la imagen del comercio', example: 'http://example.com/imagen.jpg' })
  UrlImagen?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'URL del logo del comercio', example: 'http://example.com/logo.jpg' })
  UrlLogo?: string;
  
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'URL del banner del comercio', example: 'http://example.com/banner.jpg' })
  UrlBaner?: string;

  @IsOptional()
  @ApiProperty({ description: 'Id del usuario que registra el comercio', example: 'e1b4c4f4-28a3-4e6a-84b5-b8fdb7c9c5e1' })
  usuarioId?: string;

  @IsOptional()
  @ApiProperty({ description: 'ID de la ciudad del comercio', example: 'd1a5d9e0-583e-41ae-a4e1-f45ab1e1bc79' })
  ciudadId?: string;

  @IsOptional()
  @ApiProperty({ description: 'ID del tipo de comercio', example: 'a1e0b5b1-7241-4dc6-9b9b-66e154d062d7' })
  tipoComercioId?: string;
}
