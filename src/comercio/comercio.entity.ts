import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

@Entity('comercio')
export class Comercio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nombre_establecimiento', nullable: false })
  nombreEstablecimiento: string;

  @Column({ nullable: false })
  direccion: string;

  @Column({ nullable: false })
  telefono: string;

  @Column({ nullable: false })
  nit: string;

  @Column({ type: 'point', nullable: true }) // Puedes cambiar esto si usas una estructura diferente para ubicación
  ubicacion: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @Column({ name: 'esta_activo', default: true })
  estaActivo: boolean;

  @ManyToOne(() => Usuario, usuario => usuario.comercios)
  @JoinColumn({ name: 'usuario_id' }) // Este es el nombre de la columna en la tabla "comercio"
  usuario: Usuario;
}
