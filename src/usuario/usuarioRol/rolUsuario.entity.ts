import { Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Usuario } from '../usuario.entity';
import { Rol } from '../rol/rol.entity';

@Entity('rol_usuario')
export class RolUsuario {
  @PrimaryColumn('uuid', { name: 'rol_id' })  
  rolId: string;

  @PrimaryColumn('uuid', { name: 'usuario_id' })
  usuarioId: string;

  @ManyToOne(() => Usuario, usuario => usuario.rolUsuarios , { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @ManyToOne(() => Rol, rol => rol.rolUsuarios, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'rol_id' })
  rol: Rol;
}
