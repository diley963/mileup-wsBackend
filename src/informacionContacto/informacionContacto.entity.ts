import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Comercio } from '../comercio/comercio.entity';
import { TipoInformacionContacto } from '../tipoInformacionContacto/TipoInformacionContacto.entity';

@Entity('informacion_contacto')
export class InformacionContacto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  valor?: string;
 
  // Claves foráneas
  @Column({ type: 'uuid', nullable: true })
  comercio_id: string;

  @Column({ type: 'uuid', nullable: true })
  tipo_comercio_id: string;

  @ManyToOne(() => Comercio, comercio => comercio.informacionContactos, { onDelete: 'CASCADE' })
  comercio: Comercio;

  @ManyToOne(() => TipoInformacionContacto, tipoInformacioncontacto => tipoInformacioncontacto.informacionContactos, { onDelete: 'CASCADE' })
  tipoInformacion: TipoInformacionContacto;

}
