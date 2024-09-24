import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('pais')
export class Pais {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  indicativo: string; 

  @Column({ unique: true, name : 'nombre_corto' })
  nombreCorto: string; 

  @Column({ unique: true })
  nombre: string; 
}
