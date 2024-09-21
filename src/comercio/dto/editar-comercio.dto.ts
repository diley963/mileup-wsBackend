import { IsNotEmpty, IsString, IsOptional, IsArray, IsBoolean } from 'class-validator';

export class EditarComercioDto {
  @IsOptional()
  @IsString()
  nombreEstablecimiento?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  nit?: string;

  @IsOptional()
  @IsArray()
  ubicacion?: number[]; // [latitud, longitud]

  @IsOptional()
  @IsBoolean()
  estaActivo?: boolean;
}
