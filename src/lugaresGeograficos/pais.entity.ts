import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Departamento } from './departamento.entity';

@Entity('pais')
export class Pais {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => Departamento, (departamento) => departamento.pais)
  departamentos: Departamento[];
}
