import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Role } from "../entities/role.entity";
import { In, Repository } from "typeorm";

@Injectable()
export class RoleRepository {
    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>,
    ) { }

    async create(data: Partial<Role>): Promise<Role> {
        return this.roleRepository.save(data);
    }

    async findById(id: string): Promise<Role | null> {
        return this.roleRepository.findOne({ 
            where: { id: id }, 
            relations: ['userRoles', 'rolePermissions'] 
        });
    }

    async findByIds(ids: string[]): Promise<Role[]> {
        return this.roleRepository.find({ where: { id: In(ids) } });
    }

    async findAll(): Promise<Role[]> {
        return this.roleRepository.find();
    }

    async update(id: string, data: Partial<Role>): Promise<Role> {
        const role = await this.roleRepository.update(id, data);
        return role.raw;
    }

    async remove(id: string): Promise<void> {
        await this.roleRepository.delete(id);
    }

}