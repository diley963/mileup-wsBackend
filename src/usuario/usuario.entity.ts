import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { RolUsuario } from './usuarioRol/rolUsuario.entity';
import { Comercio } from '../comercio/comercio.entity';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nombre_usuario', nullable: true })
  nombreUsuario: string;

  @Column({ nullable: true })
  contrasena: string;

  @Column({ name: 'esta_bloqueado', default: false })
  estaBloqueado: boolean;  

  @OneToMany(() => RolUsuario, rolUsuario => rolUsuario.usuario)
  rolUsuarios: RolUsuario[];

  @OneToMany(() => Comercio, comercio => comercio.usuario)
  comercios: Comercio[];
}
