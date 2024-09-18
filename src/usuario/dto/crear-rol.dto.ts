import { IsString, IsNotEmpty } from 'class-validator';

export class CrearRolDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
