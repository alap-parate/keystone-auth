import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm';

import { Permission } from './permission.entity';
import { Role } from '@/role/entities/role.entity';

@Entity('role_permissions')
export class RolePermission {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Role, (role) => role.rolePermissions, { onDelete: 'CASCADE'})
    role: Role;

    @ManyToOne(() => Permission, (perm) => perm.rolePermissions, {
        eager: true,
    })
    permission: Permission
}