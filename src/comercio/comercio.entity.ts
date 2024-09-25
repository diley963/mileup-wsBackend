import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany
} from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { TipoComercio } from '../tipoComercio/tipo-comercio.entity';
import { InformacionContacto } from '../informacionContacto/informacionContacto.entity';
import { Producto } from '../producto/producto.entity';
import { Ciudad } from '../lugaresGeograficos/ciudad.entity'; // Importa la entidad Ciudad

@Entity('comercio')
export class Comercio {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, name: 'nombre_establecimiento' })
  nombreEstablecimiento: string;

  @Column({ nullable: false })
  direccion: string;

  @Column({ nullable: false })
  telefono: string;

  @Column({ nullable: false })
  nit: string;

  @Column({ nullable: true, name: 'urlImagen' })
  urlImagen: string;

  @Column({ nullable: true, name: 'urlLogo' })
  urlLogo: string;

  @Column({ nullable: true, name: 'urlBaner' })
  urlBaner: string;

  @Column('float', { array: true, nullable: true })
  ubicacion: number[]; // Almacenará [latitud, longitud]

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @Column({ name: 'esta_activo', default: true })
  estado: boolean;

  // Claves foráneas
  @Column({ type: 'uuid',  name: 'usuario_id', nullable: true })
  usuarioId: string;

  @Column({ type: 'uuid', name:'ciudad_id', nullable: true })
  ciudadId: string;

  @Column({ type: 'uuid', name: 'tipo_comercio_id',nullable: true })
  tipoComercioId: string;

  // Relaciones
  @ManyToOne(() => Usuario, (usuario) => usuario.comercios)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @ManyToOne(() => Ciudad, (ciudad) => ciudad.comercios)
  @JoinColumn({ name: 'ciudad_id' })
  ciudad: Ciudad;

  @ManyToOne(() => TipoComercio, (tipoComercio) => tipoComercio.comercios)
  @JoinColumn({ name: 'tipo_comercio_id' })
  tipoComercio: TipoComercio;

  @OneToMany(() => InformacionContacto, (informacionContacto) => informacionContacto.comercio)
  informacionContactos: InformacionContacto[];

  @OneToMany(() => Producto, (producto) => producto.comercio, { cascade: true })
  productos: Producto[];
}
