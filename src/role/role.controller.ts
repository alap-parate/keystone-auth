import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { StatusRoleDto } from './dto/role-status.dto';
import { ParseUUIDPipe } from '@nestjs/common';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto.name, createRoleDto.desc);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.roleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto.name, updateRoleDto.desc);
  }

  @Patch(':id/status')
  status(@Param('id', new ParseUUIDPipe()) id: string, @Body() statusRoleDto: StatusRoleDto) {
    return this.roleService.status(id, statusRoleDto.isActive);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.roleService.remove(id);
  }
}