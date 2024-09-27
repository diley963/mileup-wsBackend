import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn
  } from 'typeorm';
  import { ServicioDomiciliario } from '../servicio/servicio-domiciliario.entity';
  
  @Entity('estado_entrega')
  export class EstadoEntrega {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn({ name: 'fecha_actualizacion' })
    fechaActualizacion: Date;
  
    @Column({ nullable: false })
    estado: string; // Ejemplo: pendiente, en_proceso, entregado, cancelado
    
    @Column({ nullable: false })
    vigente: boolean;  

    // Clave foránea
    @Column({ type: 'uuid', name: 'servicio_domiciliario_id', nullable: false })
    servicioDomiciliarioId: string;
  
    // Relación
    @ManyToOne(() => ServicioDomiciliario, (servicioDomiciliario) => servicioDomiciliario.estadosEntrega)
    @JoinColumn({ name: 'servicio_domiciliario_id' })
    servicioDomiciliario: ServicioDomiciliario;
  }
  