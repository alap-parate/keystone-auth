import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleRepository } from './repository/role.repository';

@Injectable()
export class RoleService {
  constructor(  
    private roleRepository: RoleRepository,
  ) {}

  async check(roles: string[]) {
    const role = await this.roleRepository.findByIds(roles);
    if(role.length !== roles.length) {
      throw new NotFoundException('Role not found');
    }
    return role;
  } 

  async create(name: string, desc: string) {
    const role = this.roleRepository.create({name, desc});
    return role;
  }

  async update(id: string, name: string, desc: string) {
    return this.roleRepository.update(id, {name, desc});
  }

  async status(id: string, isActive: boolean) {
    return this.roleRepository.update(id, {isActive});
  }

  async findOne(id: string) {
    return this.roleRepository.findById(id);
  }

  async findAll() {
    const role = this.roleRepository.findAll();
    return role;
  }

  async remove(id: string) {
    return this.roleRepository.remove(id);
  }
}