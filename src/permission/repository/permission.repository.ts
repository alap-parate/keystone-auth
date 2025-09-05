import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Permission } from "../entities/permission.entity";
import { DeepPartial, In, Repository } from "typeorm";
import { Role } from "@/role/entities/role.entity";
import { RolePermission } from "../entities/role_permission.entity";

@Injectable()
export class PermissionRepository {
    constructor(
        @InjectRepository(Permission) private permissionRepository: Repository<Permission>,
        @InjectRepository(RolePermission) private rolePermissionRepository: Repository<RolePermission>,
    ) { }

    async findAll(): Promise<Permission[]> {
        return this.permissionRepository.find();
    }

    async findByIds(ids: string[]): Promise<Permission[]> {
        return this.permissionRepository.find({ where: { id: In(ids) } });
    }

    async updateRolePermissions(roleId: string, newPermissionIds: string[]): Promise<RolePermission[]> {
        // 1. Fetch existing permissions for the role
        const existingRolePermissions = await this.rolePermissionRepository.find({
            where: { role: { id: roleId } },
            relations: ['permission']
        });

        const existingPermissionIds = existingRolePermissions.map(rp => rp.permission.id);

        // 2. Compare with new list
        const permissionsToAdd = newPermissionIds.filter(id => !existingPermissionIds.includes(id));
        const permissionsToRemove = existingPermissionIds.filter(id => !newPermissionIds.includes(id));

        // 3. Delete only the revoked ones
        if (permissionsToRemove.length > 0) {
            await this.rolePermissionRepository.delete({
                role: { id: roleId },
                permission: { id: In(permissionsToRemove) }
            });
        }

        // 4. Insert only the new ones
        const newRolePermissions: RolePermission[] = [];
        if (permissionsToAdd.length > 0) {
            for (const permissionId of permissionsToAdd) {
                const rolePermission = this.rolePermissionRepository.create({
                    role: { id: roleId } as Role,
                    permission: { id: permissionId } as Permission,
                });
                const savedRolePermission = await this.rolePermissionRepository.save(rolePermission);
                newRolePermissions.push(savedRolePermission);
            }
        }

        // Return all current role permissions
        return this.rolePermissionRepository.find({
            where: { role: { id: roleId } },
            relations: ['permission']
        });
    }

}