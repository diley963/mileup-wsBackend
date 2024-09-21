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
}
