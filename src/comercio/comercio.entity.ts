import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { TipoComercio } from '../tipoComercio/tipo-comercio.entity';
import { InformacionContacto } from '../informacionContacto/informacionContacto.entity';
import { Producto } from '../producto/producto.entity';
import { Ciudad } from '../lugaresGeograficos/ciudad.entity'; // Importa la entidad Ciudad

@Entity('comercio')
export class Comercio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nombre_establecimiento', nullable: false })
  nombreEstablecimiento: string;

  @Column({ nullable: false })
  direccion: string;

  @Column({ nullable: false })
  telefono: string;

  @Column({ nullable: false })
  nit: string;

  @Column({ nullable: true })
  UrlImagen: string;

  @Column({ nullable: true })
  UrlLogo: string;

  @Column({ nullable: true })
  UrlBaner: string;

  @Column('float', { array: true, nullable: true })
  ubicacion: number[]; // Almacenará [latitud, longitud]

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @Column({ name: 'esta_activo', default: true })
  estaActivo: boolean;

  @ManyToOne(() => Usuario, (usuario) => usuario.comercios)
  @JoinColumn({ name: 'usuario_id' }) 
  usuario: Usuario;


  @ManyToOne(() => Ciudad, ciudad => ciudad.comercios) // Relación con Ciudad
  @JoinColumn({ name: 'ciudad_id' }) 
  ciudad: Ciudad; // Campo para la ciudad

  @ManyToOne(() => TipoComercio, (tipoComercio) => tipoComercio.comercios)
  @JoinColumn({ name: 'tipo_comercio_id' }) 
  tipoComercio: TipoComercio;

  @OneToMany(() => InformacionContacto, (informacionContacto) => informacionContacto.comercio)
  informacionContactos: InformacionContacto[];

  @OneToMany(() => Producto, (producto) => producto.comercio, { cascade: true })
  productos: Producto[];
}
