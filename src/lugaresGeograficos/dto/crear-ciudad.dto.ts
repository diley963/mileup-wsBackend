import { IsNotEmpty, IsString, IsOptional, IsUUID, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearCiudadDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Nombre de la ciudad', example: 'Bogotá' })
  nombre: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ description: 'ID del departamento al que pertenece la ciudad', example: '1be434cf-382f-4ef6-9c4f-8e6fb2cfe3d5' })
  departamentoId: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ description: 'Estado de vigencia de la ciudad', example: true })
  vigente: boolean;  // Campo de vigente
}
