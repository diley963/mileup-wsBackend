import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';
import { ServicioDomiciliario } from '../servicio/servicio-domiciliario.entity';

@Entity('cliente')
export class Cliente {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, name: 'nombre_cliente' })
  nombre: string;

  @Column({ nullable: false })
  telefono: string;

  @Column({ nullable: false })
  direccion: string;

  @Column({ nullable: true, type: 'jsonb' })
  ubicacion: { latitud: number; longitud: number }; // Ubicación del cliente

  @OneToMany(() => ServicioDomiciliario, (servicioDomiciliario) => servicioDomiciliario.cliente)
  serviciosDomiciliarios: ServicioDomiciliario[];
}
