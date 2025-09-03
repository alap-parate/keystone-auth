import { UserRole } from "@/role/entities/user_roles";
import { UserSession } from "@/session/entities/user_session.entity";
import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
 } from "typeorm";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'email', unique: true })
    email: string;

    @Column({ name: 'pwd_hash'})
    pwdHash: string;

    @Column({ name: 'phoneno', nullable: true, length: 14, unique: true })
    phoneNo: string;

    @Column({ name: 'name', nullable: true, length: 255 })
    name: string;

    @Column({ name: 'is_active', default: true })
    isActive: boolean;
    
    @Column({ name: 'mfa_secret', nullable: true })
    mfaSecret: string;

    @Column({ name: 'is_mfa_enabled', default: false })
    isMfaEnabled: boolean;

    @Column({ name: 'mfa_backup_codes', nullable: true })
    mfaBackupCodes?: string;

    @Column({ name: 'is_email_verified', default: false })
    isEmailVerified: boolean;

    @Column({ name: 'is_phone_verified', default: false })
    isPhoneVerified: boolean;
    
    @OneToMany(() => UserRole, (userRole) => userRole.user)
    roles: UserRole[];
    
    @OneToMany(() => UserSession, (session) => session.user)
    sessions: UserSession[]

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}