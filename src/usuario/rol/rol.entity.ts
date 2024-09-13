import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RolUsuario } from '../usuarioRol/rolUsuario.entity';

@Entity('rol')
export class Rol {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => RolUsuario, rolUsuario => rolUsuario.rol)
  rolUsuarios: RolUsuario[];
}
