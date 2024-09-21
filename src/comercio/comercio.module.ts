import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComercioService } from './comercio.service';
import { ComercioController } from './comercio.controller';
import { Comercio } from './comercio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comercio])],
  controllers: [ComercioController],
  providers: [ComercioService],
})
export class ComercioModule {}

