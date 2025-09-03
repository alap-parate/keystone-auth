export class Session {}
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
    OneToMany,
} from "typeorm"

import { User } from "@/user/entities/user.entity";
import { RefreshToken } from "@/auth/entities/refresh-token.entity";

@Entity({ name: 'user_sessions' })
export class UserSession {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.sessions, { onDelete: 'CASCADE'})
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ name: 'ip_address', type: 'inet', nullable: true})
    ipAddress: string;

    @Column({ name: 'user_agent', nullable: true })
    userAgent: string;

    @Column({ default: true })
    isValid: boolean;

    @Column({ name: 'revoked_at', nullable: true, type: 'timestamptz' })
    revokedAt: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz'})
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.session)
    refreshTokens: RefreshToken[];
}
