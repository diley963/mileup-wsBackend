import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTipoInformacionContactoDto {
  @ApiProperty({
    description: 'Descripción del tipo de información de contacto (Ej: Teléfono, WhatsApp, Correo Electrónico)',
    example: 'WhatsApp',
  })
  @IsString()
  descripcion: string;

  @ApiProperty({
    description: 'Campo opcional para la plataforma de aplicaciones como WhatsApp',
    example: 'https://wa.me/123456789',
    required: false,
  })
  @IsOptional()
  @IsString()
  path?: string;
}
