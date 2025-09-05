import { User } from "@/user/entities/user.entity";
import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    DeleteDateColumn,
    JoinColumn,
    ManyToOne,
 } from "typeorm";

@Entity({ name: 'two_factor' })
export class TwoFactor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'user_id' })
    userId: string;

    @ManyToOne(() => User, (user) => user.twoFactor)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ name: 'secret' })
    secret: string;

    @Column({ name: 'backup_codes' })
    backupCodes: string[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;
    
}