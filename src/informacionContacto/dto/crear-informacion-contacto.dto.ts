import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInformacionContactoDto {
  @ApiProperty({
    description: 'Valor de la información de contacto (Ej: número de teléfono, correo electrónico)',
    example: '1234567890',
  })
  @IsString()
  valor: string;

  @ApiProperty({
    description: 'ID del comercio asociado',
    example: 'uuid-comercio',
  })
  @IsUUID()
  comercioId: string;
  

  @ApiProperty({
    description: 'ID del tipo de información de contacto',
    example: 'uuid-tipo-informacion-contacto',
  })
  @IsUUID()
  tipoInformacionId: string;


}
