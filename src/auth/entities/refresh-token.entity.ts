import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    Index,
    UpdateDateColumn,
  } from "typeorm";
  import { UserSession } from "@/session/entities/user_session.entity";
  
  @Entity({ name: "refresh_tokens" })
  export class RefreshToken {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @ManyToOne(() => UserSession, (session) => session.refreshTokens, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "session_id" })
    session: UserSession;
  
    @Index({ unique: true })
    @Column({ name: "jti", nullable: false })
    jti: string;
  
    @Column({ name: "refreshtoken_hash", nullable: false })
    refreshTokenHash: string;
  
    @Column({ default: true })
    isValid: boolean;
  
    @Column({ name: "revoked_at", nullable: true, type: "timestamptz" })
    revokedAt: Date;
  
    @Column({ name: "expires_at", nullable: false, type: "timestamptz" })
    expiresAt: Date;
  
    @CreateDateColumn({ name: "created_at", type: "timestamptz" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
    updatedAt: Date;
  }
  