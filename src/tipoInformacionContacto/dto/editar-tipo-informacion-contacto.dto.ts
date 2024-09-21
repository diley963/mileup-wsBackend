import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTipoInformacionContactoDto {
  @ApiProperty({
    description: 'Descripción actualizada del tipo de información de contacto',
    example: 'Correo Electrónico',
    required: false,
  })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({
    description: 'Campo opcional actualizado para la plataforma de aplicaciones como WhatsApp',
    example: 'https://wa.me/987654321',
    required: false,
  })
  @IsOptional()
  @IsString()
  pat?: string;
}
