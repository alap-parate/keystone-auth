import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Role } from "../entities/role.entity";
import { DeepPartial, In, Repository } from "typeorm";

@Injectable()
export class RoleRepository {
    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>,
    ) {}

    async create(data: Partial<Role>): Promise<Role> {
        return this.roleRepository.save(data);
    }

    async findById(id: string): Promise<Role | null> {
        return this.roleRepository.findOne({ where: { id: id } });
    }

    async findByIds(ids: string[]): Promise<Role[]> {
        return this.roleRepository.find({ where: { id: In(ids) } });
    }

    async findAll(): Promise<Role[]> {
        return this.roleRepository.find();
    }

    async update(id: string, data: Partial<Role>): Promise<Role> {
        const entity = await this.roleRepository.findOne({ where: { id: id } });
        if(!entity) {
            throw new Error('Role not found');
        }
        const role = await this.roleRepository.update(id, data);
        return role.raw;
    }

    async remove(id: string): Promise<void> {
        await this.roleRepository.delete(id);
    }

}