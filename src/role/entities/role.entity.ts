import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    UpdateDateColumn,
    CreateDateColumn,
 } from "typeorm";
import { UserRole } from "./user_roles";
import { RolePermission } from "@/permission/entities/role_permission.entity";

@Entity({ name: 'roles' })
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', unique: true})
    name: string;

    @Column({ name: 'desc', nullable: true})
    desc: string;

    @OneToMany(() => UserRole, (userRole) => userRole.role)
    userRoles: UserRole[]

    @OneToMany(() => RolePermission, (rp) => rp.role, {cascade: true})
    rolePermissions: RolePermission[]

    @Column({ name: 'is_active', default: true })
    isActive: boolean;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;
}

