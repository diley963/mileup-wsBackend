import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Comercio } from '../comercio/comercio.entity';

@Entity('producto')
export class Producto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  descuento: number;

  @Column({ nullable: true })
  fotoUrl: string;

  @ManyToOne(() => Comercio, (comercio) => comercio.productos)
  comercio: Comercio;
}
