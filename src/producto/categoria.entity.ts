import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Producto } from '../producto/producto.entity';

@Entity('categoria')
export class Categoria {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => Producto, (producto) => producto.categoria)
  productos: Producto[];
}
