import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Comercio } from '../comercio/comercio.entity';
import { TipoInformacionContacto } from '../tipoInformacionContacto/TipoInformacionContacto.entity';

@Entity('informacion_contacto')
export class InformacionContacto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  valor?: string;

  @ManyToOne(() => Comercio, comercio => comercio.informacionContactos, { onDelete: 'CASCADE' })
  comercio: Comercio;

  @ManyToOne(() => TipoInformacionContacto, tipoInformacioncontacto => tipoInformacioncontacto.informacionContactos, { onDelete: 'CASCADE' })
  tipoInformacion: TipoInformacionContacto;

}
