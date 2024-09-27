import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn,CreateDateColumn } from 'typeorm';
import { RolUsuario } from './usuarioRol/rolUsuario.entity';
import { Comercio } from '../comercio/comercio.entity';
import { Colaborador } from '../colaborador/colaborador.entity'; // Asegúrate de importar la entidad Colaborador

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nombre_usuario', nullable: false })
  nombreUsuario: string;

  @Column({ name: 'nombre_completo', nullable: false })
  nombreCompleto: string;

  @Column({ name: 'correo_electronico', unique: true, nullable: false })
  correoElectronico: string;

  @Column({ nullable: false })
  contrasena: string;

  @Column({ name: 'telefono', nullable: true })
  telefono?: string;

  @Column({ name: 'esta_bloqueado', default: false })
  estaBloqueado: boolean;  

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @Column({ name: 'fecha_ultimo_acceso', nullable: true })
  fechaUltimoAcceso?: Date; 

  @Column({ name: 'esta_activo', default: true })
  estaActivo: boolean;

  @Column({ name: 'url_imagen_perfil', nullable: true })
  urlImagenPerfil?: string;

  @Column({ name: 'direccion', nullable: true })
  direccion?: string;

  @OneToMany(() => RolUsuario, rolUsuario => rolUsuario.usuario)
  rolUsuarios: RolUsuario[];

  @OneToMany(() => Comercio, comercio => comercio.usuario)
  comercios: Comercio[];
 
  @OneToMany(() => Colaborador, colaborador => colaborador.usuario) 
  colaboradores: Colaborador[];
}

