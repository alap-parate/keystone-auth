import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { UserSession } from "../entities/user_session.entity";
import { DeepPartial, Repository } from "typeorm";

@Injectable()
export class SessionRepository {
    constructor(
        @InjectRepository(UserSession) private sessionRepository: Repository<UserSession>,
    ) {}

    async create(data: DeepPartial<UserSession>): Promise<UserSession> {
        return this.sessionRepository.save(data);
    }

    async findByJti(jti: string): Promise<UserSession | null> {
        return this.sessionRepository.findOne({ where: { jti: jti } });
    }

    async findByUserId(userId: string): Promise<UserSession[]> {
        return this.sessionRepository.find({ where: { user: { id: userId } } });
    }

    async findById(id: string): Promise<UserSession | null> {
        return this.sessionRepository.findOne({ where: { id: id } });
    }

    async update(id: string, data: UserSession): Promise<UserSession> {
        const session = await this.sessionRepository.update(id, data);
        return session.raw;
    }

    async removeById(id: string): Promise<void> {
        await this.sessionRepository.softDelete(id);
    }

    async removeByUserId(userId: string): Promise<void> {
        await this.sessionRepository.softDelete({ user: { id: userId } });
    }
}