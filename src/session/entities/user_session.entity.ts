import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Index,
} from "typeorm"

import { User } from "@/user/entities/user.entity";

@Entity({ name: 'user_sessions' })
export class UserSession {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index()
    @ManyToOne(() => User, (user) => user.sessions, { onDelete: 'CASCADE'})
    @JoinColumn({ name: 'userId' })
    user: User;

    @Index({ unique: true })
    @Column({ name: "jti", nullable: false })
    jti: string;
  
    @Column({ name: "refreshtoken_hash", nullable: false })
    refreshTokenHash: string;

    @Column({ name: 'ip_address', type: 'inet', nullable: true})
    ipAddress: string;

    @Column({ name: 'user_agent', nullable: true })
    userAgent: string;

    @Column({ name: "expires_at", nullable: false, type: "timestamptz" })
    expiresAt: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz'})
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
    revokedAt: Date;

}
