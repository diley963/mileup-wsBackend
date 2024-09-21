import { IsString, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateInformacionContactoDto {
  @ApiProperty({
    description: 'Valor actualizado de la información de contacto',
    example: '1234567890',
    required: false,
  })
  @IsOptional()
  @IsString()
  valor?: string;

  @ApiProperty({
    description: 'ID actualizado del comercio asociado',
    example: 'uuid-comercio',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  comercioId?: string;

  @ApiProperty({
    description: 'ID actualizado del tipo de información de contacto',
    example: 'uuid-tipo-informacion-contacto',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  tipoInformacionId?: string;
}
