import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InformacionContacto } from './informacionContacto.entity';
import { InformacionContactoController } from './informacion-contacto.controller';
import { InformacionContactoService } from './informacion-contacto.service';
import { Comercio } from '../comercio/comercio.entity';
import { TipoInformacionContacto } from '../tipoInformacionContacto/TipoInformacionContacto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([InformacionContacto, Comercio, TipoInformacionContacto]),
  ],
  controllers: [InformacionContactoController],
  providers: [InformacionContactoService],
})
export class InformacionContactoModule {}
