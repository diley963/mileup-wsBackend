import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,OneToMany } from 'typeorm';
import { Departamento } from './departamento.entity';
import { Comercio } from '../comercio/comercio.entity'; // Importa Comercio

@Entity('ciudad')
export class Ciudad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nombre: string;
  
  @Column({ default: true })
  vigente: boolean;

  @ManyToOne(() => Departamento, (departamento) => departamento.ciudades)
  departamento: Departamento;

  @OneToMany(() => Comercio, (comercio) => comercio.ciudad) // Relación con Comercio
  comercios: Comercio[];
}
