import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,JoinColumn } from 'typeorm';
import { Comercio } from '../comercio/comercio.entity';
import { Categoria } from '../producto/categoria.entity';

@Entity('producto')
export class Producto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  descuento: number;

  @Column({ nullable: true, name: 'imagen_url' })
  imagenUrl: string;

  @Column({ nullable: true })
  comercio_id: string;

  @ManyToOne(() => Comercio, (comercio) => comercio.productos)
  @JoinColumn({ name: 'comercio_id' })
  comercio: Comercio;

  // Relación con la categoría
  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;
}
