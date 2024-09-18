import { IsString, IsNotEmpty } from 'class-validator';

export class ActualizarRolDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
