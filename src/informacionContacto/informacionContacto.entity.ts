import { JoinColumn,Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Comercio } from '../comercio/comercio.entity';
import { TipoInformacionContacto } from '../tipoInformacionContacto/TipoInformacionContacto.entity';

@Entity('informacion_contacto')
export class InformacionContacto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  valor?: string;
 
  // Claves foráneas
  @Column({ type: 'uuid', name: 'comercio_id', nullable: true })
  comercioId: string;

  @Column({ type: 'uuid', name: 'tipo_informacion_id', nullable: true })
  tipoInformacionId: string;

  //relaciones
  @ManyToOne(() => Comercio, comercio => comercio.informacionContactos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'comercio_id' })
  comercio: Comercio;

  @ManyToOne(() => TipoInformacionContacto, tipoInformacioncontacto => tipoInformacioncontacto.informacionContactos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tipo_informacion_id' })
  tipoInformacion: TipoInformacionContacto;

}
