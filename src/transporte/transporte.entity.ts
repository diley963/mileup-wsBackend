import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
  } from 'typeorm';
  import { Colaborador } from '../colaborador/colaborador.entity'; // Asegúrate de importar la entidad colaborador
  
  @Entity('transporte')
  export class Transporte {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ nullable: false })
    tipo: string; // Ejemplo: bicicleta, moto, coche, etc.
  
    @Column({ nullable: true })
    descripcion: string; // Descripción adicional del transporte
  
    @OneToMany(() => Colaborador, (colaborador) => colaborador.transporte)
    colaboradores: Colaborador[]; // Relación inversa con Colaborador
  }
  