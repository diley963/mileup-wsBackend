import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Pais } from './pais.entity';
import { Ciudad } from './ciudad.entity';

@Entity('departamento')
export class Departamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nombre: string;  

  // Claves foráneas
  @Column({ type: 'uuid', nullable: true })
  pais_id: string;

  @OneToMany(() => Ciudad, (ciudad) => ciudad.departamento)
  ciudades: Ciudad[];
}
