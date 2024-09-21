import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { InformacionContacto } from '../informacionContacto/informacionContacto.entity';

@Entity('tipo_informacion_contacto')
export class TipoInformacionContacto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  descripcion: string; // Ej: "Teléfono Fijo", "WhatsApp", "Correo Electrónico", etc.

  @Column({ nullable: true })
  pat: string; // Para el caso de WhatsApp u otras aplicaciones.

  @OneToMany(() => InformacionContacto, informacionContacto => informacionContacto.tipoInformacion)
  informacionContactos: InformacionContacto[];
}
