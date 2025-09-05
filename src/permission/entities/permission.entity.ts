import { 
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Column
} from "typeorm";
import { RolePermission } from "./role_permission.entity";

@Entity({ name: 'permissions' })
export class Permission {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @Column()
    description: string;

    @OneToMany(() => RolePermission, (rp) => rp.permission)
    rolePermissions: RolePermission[];
}
