import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoComercio } from './tipo-comercio.entity';
import { TipoComercioService } from './tipo-comercio.service';
import { TipoComercioController } from './tipo-comercio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TipoComercio])],
  controllers: [TipoComercioController],
  providers: [TipoComercioService],
})
export class TipoComercioModule {}
