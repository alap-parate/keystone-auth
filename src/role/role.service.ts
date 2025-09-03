import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(  
    private roleRepository: Repository<Role>,
  ) {}

  async check(roles: string[]) {
    const role = await this.roleRepository.find({ where: { id: In(roles) } });
    if(role.length !== roles.length) {
      throw new NotFoundException('Role not found');
    }
    return role;
  } 

  async createRole(name: string, desc: string) {
    const role = this.roleRepository.create({ name, desc });
    return this.roleRepository.save(role);
  }

  async update(id: string, name: string, desc: string) {
    const role = await this.roleRepository.findOne({ where: { id: id } });
    if(!role) {
      throw new NotFoundException('Role not found');
    }
    role.name = name;
    role.desc = desc;
    return this.roleRepository.save(role);
  }

  async findAll(isActive: boolean, isList: boolean) {
    const role = this.roleRepository.find({ 
      where: { isActive: isActive },
      select: isList ? ['id', 'name'] : undefined
    });
    return role;
  }

  async remove(id: string) {
    return this.roleRepository.delete(id);
  }
}