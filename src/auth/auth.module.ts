import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy'; 
import { UsuariosModule } from '../usuarios/usuarios.module'; 
import { ConfigModule } from '@nestjs/config'; 
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ConfigModule, 
    PassportModule,
    JwtModule.register({
      secret: '6b20756e-4e0c-4fe7-9674-91faf66054a9', 
      signOptions: { expiresIn: '60m' }, 
    }),
    UsuariosModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
