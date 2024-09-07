import { IsInt, IsString } from 'class-validator';

export class JwtPayloadDto {
  @IsString()
  username: string;

  @IsString()
  sub: string;

  @IsInt()
  iat: number;

  @IsInt()
  exp: number;
}
