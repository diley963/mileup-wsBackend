import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
  } from 'typeorm';
  import { Comercio } from '../comercio/comercio.entity';
  import { Cliente } from '../cliente/cliente.entity';
  import { EstadoEntrega } from '../estados/estado-entrega.entity';
  import { Colaborador } from '../colaborador/colaborador.entity';

  @Entity('servicio_domiciliario')
  export class ServicioDomiciliario {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn({ name: 'fecha_creacion' })
    fechaCreacion: Date;
  
    @UpdateDateColumn({ name: 'fecha_actualizacion' })
    fechaActualizacion: Date;
  
    @Column({ nullable: false, type: 'jsonb' })
    ubicacion: { latitud: number; longitud: number }; // Ubicación para Maps
  
    @Column({ nullable: false, default: 'descripcion_lugar' })
    descripcionLugar: string; 
   
    // Claves foráneas
    @Column({ type: 'uuid', name: 'comercio_id', nullable: false })
    comercioId: string;
  
    @Column({ type: 'uuid', name: 'cliente_id', nullable: false })
    clienteId: string;
    
    @Column({ type: 'uuid', name: 'colaborador_id', nullable: false })
    colaboradorId: string;

    // Relaciones
    @ManyToOne(() => Comercio, (comercio) => comercio.serviciosDomiciliarios)
    @JoinColumn({ name: 'comercio_id' })
    comercio: Comercio;
  
    @ManyToOne(() => Cliente, (cliente) => cliente.serviciosDomiciliarios)
    @JoinColumn({ name: 'cliente_id' })
    cliente: Cliente;
    
    @ManyToOne(() => Colaborador, (colaborador) => colaborador.serviciosDomiciliarios)
    @JoinColumn({ name: 'colaborador_id' })
    colaborador: Colaborador;
    
    @OneToMany(() => EstadoEntrega, (estadoEntrega) => estadoEntrega.servicioDomiciliario)
    estadosEntrega: EstadoEntrega[];
  }
  