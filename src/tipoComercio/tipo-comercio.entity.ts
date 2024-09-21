import { Entity, Column, PrimaryGeneratedColumn , OneToMany } from 'typeorm';
import { Comercio } from '../comercio/comercio.entity';

@Entity('tipo-comercio')
export class TipoComercio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  nombre: string; 

  @Column({ nullable: false })
  descripcion: string;  

  @Column({ nullable: false })
  path: string; 

  @OneToMany(() => Comercio, comercio => comercio.tipoComercio)
  comercios: Comercio[];
}
