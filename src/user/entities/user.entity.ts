import { UserRole } from "@/role/entities/user_roles";
import { UserSession } from "@/session/entities/user_session.entity";
import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    DeleteDateColumn,
 } from "typeorm";
import { StatusEnum } from "./status.enum";
import { TwoFactor } from "@/auth/entities/two-factor.entity";
import { OneToOne } from "typeorm";
@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'email', unique: true })
    email: string;

    @Column({ name: 'pwd_hash'})
    pwdHash: string;

    @Column({ name: 'name', nullable: true, length: 255 })
    name: string;

    @Column({ name: 'phoneno', nullable: true, length: 14, unique: true })
    phoneNo: string;

    @Column({ name: 'status', default: StatusEnum.active })
    status: StatusEnum;
    
    @Column({ name: 'is_mfa_enabled', default: false })
    isMfaEnabled: boolean;

    @Column({ name: 'is_email_verified', default: false })
    isEmailVerified: boolean;

    @Column({ name: 'email_verification_token', nullable: true })
    emailConfirmToken: string;

    @Column({ name: 'forgot_password_token', nullable: true })
    forgotPasswordToken: string;

    @OneToMany(() => UserRole, (userRole) => userRole.user)
    roles: UserRole[];
    
    @OneToMany(() => UserSession, (session) => session.user)
    sessions: UserSession[]

    @OneToOne(() => TwoFactor, (twoFactor) => twoFactor.user)
    twoFactor: TwoFactor;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    deletedAt: Date;
}