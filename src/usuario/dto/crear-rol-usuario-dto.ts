import { IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRolUsuarioDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID del usuario', example: 'a6f2c43e-4bdf-4eab-bae5-3e49c99db9f7' })
  usuarioId: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID del rol', example: 'e1f2c45e-4cdf-4ebb-aeb5-5e99c89cb9f9' })
  rolId: string;
}
