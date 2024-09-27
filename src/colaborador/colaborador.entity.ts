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
  import { ServicioDomiciliario } from '../servicio/servicio-domiciliario.entity';
  import { Transporte } from '../transporte/transporte.entity'; 

  @Entity('colaborador')
  export class Colaborador {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ nullable: false })
    nombre: string;
  
    @Column({ nullable: false })
    telefono: string;
  
    @Column({ nullable: true })
    correo: string;
  
    @CreateDateColumn({ name: 'fecha_creacion' })
    fechaCreacion: Date;
  
    @Column({ name: 'esta_activo', default: true })
    estado: boolean;

    @Column({ nullable: true, name: 'url_imagen' }) 
    urlImagen?: string;

    @Column({ type: 'uuid', name: 'usuario_id' })
    usuarioId: string; 
  
    @Column({ type: 'uuid', name: 'transporte_id' })
    transporteId: string; 
  
    // Relación con Usuario (si es necesario)
    @ManyToOne(() => Usuario, (usuario) => usuario.colaboradores)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @ManyToOne(() => Transporte, (transporte) => transporte.colaboradores) // Suponiendo que Transporte tiene una relación inversa
    @JoinColumn({ name: 'transporte_id' }) // Asegúrate de tener la columna adecuada en la entidad Transporte
    transporte: Transporte;
  
    // Relación con ServicioDomiciliario
    @OneToMany(() => ServicioDomiciliario, (servicioDomiciliario) => servicioDomiciliario.colaborador)
    serviciosDomiciliarios: ServicioDomiciliario[];
  
  
  }
  