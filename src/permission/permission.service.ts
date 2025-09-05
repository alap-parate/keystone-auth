import { Injectable } from '@nestjs/common';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionRepository } from './repository/permission.repository';
import { PermissionDto } from './dto/permission.dto';
import { RolePermission } from './entities/role_permission.entity';

@Injectable()
export class PermissionService {

  constructor(
    private readonly permissionRepository: PermissionRepository,
  ) {}

  findAll(): Promise<PermissionDto[]> {
    return this.permissionRepository.findAll();
  }

  update(id: string, updatePermissionDto: UpdatePermissionDto): Promise<RolePermission[]> {
    return this.permissionRepository.updateRolePermissions(id, updatePermissionDto.permissionIds);
  }

}