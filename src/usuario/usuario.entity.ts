import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  nombre_usuario: string;

  @Column({ type: 'text' })
  contrasena: string;

  @Column({ type: 'boolean', default: false })
  esta_bloqueado: boolean;
}
