import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,OneToMany,JoinColumn } from 'typeorm';
import { Departamento } from './departamento.entity';
import { Comercio } from '../comercio/comercio.entity'; // Importa Comercio

@Entity('ciudad')
export class Ciudad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nombre: string;
  
  @Column({ unique: true })
  indicativo: string;

  @Column({ default: true })
  vigente: boolean;

  // Claves foráneas
  @Column({ type: 'uuid', nullable: true })
  departamento_id: string;

  @ManyToOne(() => Departamento, (departamento) => departamento.ciudades)
  @JoinColumn({ name: 'departamento_id' })
  departamento: Departamento;

  @OneToMany(() => Comercio, (comercio) => comercio.ciudad) // Relación con Comercio
  comercios: Comercio[];
}
