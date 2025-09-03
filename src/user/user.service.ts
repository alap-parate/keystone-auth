import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository, DataSource } from 'typeorm';
import { RoleService } from '@/role/role.service';
import { CreateUserInterface } from './interfaces/create-user.interface';
import { UpdateUserInterface } from './interfaces/update-user.interface';
import * as bcrypt from 'bcrypt';
import { UserRole } from '@/role/entities/user_roles';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '@/role/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleService: RoleService,
    @InjectRepository(UserRole) private userRoleRepository: Repository<UserRole>,
    private dataSource: DataSource,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user || null;
  }

  async checkDuplicate(email: string, phoneNo: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: 
      [ 
        {email: email}, 
        {phoneNo: phoneNo}
      ]
    });

    if(user) {
      if(user.email === email) {
        throw new ConflictException('Email already exists');
      }
      if(user.phoneNo === phoneNo) {
        throw new ConflictException('Phone number already exists');
      }
    }
  }

  async createUser( user: CreateUserInterface ): Promise<Omit<User, 'pwdHash'>> {
    const { email, password, phoneNo, name, roles } = user;

    await this.checkDuplicate(email, phoneNo);
    
    if(roles.length === 0) {
      throw new NotFoundException('Roles are required');
    }

    await this.roleService.check(roles);
    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.dataSource.transaction(async manager => {
      const newUser = manager.create(User, {
        email,
        pwdHash: hashedPassword,
        name,
        phoneNo,
      });
      const savedUser = await manager.save(newUser);
      
      const userRoles = roles.map(roleId => ({
        user: savedUser,
        role: { id: roleId }
      }));

      await manager.save(UserRole, userRoles);
      
      return savedUser;
    });
  }

  async findById( userId: string ): Promise<Omit<User, 'pwdHash'> | null> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return user || null;
  }

  async updateUser( userId: string, userData: UpdateUserInterface ): Promise<Omit<User, 'pwdHash'> | null> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return user || null;
  }
}
