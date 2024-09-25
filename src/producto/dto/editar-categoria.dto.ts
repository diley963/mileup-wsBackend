import { PartialType } from '@nestjs/swagger';
import { CreateCategoriaDto } from './create-categoria.dto';

export class EditarCategoriaDto extends PartialType(CreateCategoriaDto) {}
