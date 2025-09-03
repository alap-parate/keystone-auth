import { 
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Unique
 } from "typeorm";
import { Role } from "./role.entity";
import { User } from "@/user/entities/user.entity";


@Entity({ name: 'user_roles' })
@Unique(['userId', 'roleId']) 
export class UserRole {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.roles, { onDelete: 'CASCADE'})
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Role, (role) => role.userRoles, { onDelete: 'CASCADE'})
    @JoinColumn({ name: 'roleId' })
    role: Role

}