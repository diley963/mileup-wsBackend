import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoInformacionContacto } from './TipoInformacionContacto.entity';
import { TipoInformacionContactoService } from './tipo-informacion-contacto.service';
import { TipoInformacionContactoController } from './tipo-informacion-contacto.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TipoInformacionContacto])],
  providers: [TipoInformacionContactoService],
  controllers: [TipoInformacionContactoController],
})
export class TipoInformacionContactoModule {}
