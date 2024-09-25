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

  @Column({ nullable: true})
  descripcion: string;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  descuento: number;

  @Column({ nullable: true, name: 'imagen_url' })
  imagenUrl: string;

  // Claves foráneas

  @Column({ type: 'uuid', name: 'comercio_id',  nullable: true })
  comercioId: string;

  @Column({ type: 'uuid', name: 'categoria_id', nullable: true })
  categoriaId: string;


  // Relación con la categoría

  @ManyToOne(() => Comercio, (comercio) => comercio.productos)
  @JoinColumn({ name: 'comercio_id' })
  comercio: Comercio;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;
}
