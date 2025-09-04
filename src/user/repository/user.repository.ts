import { Injectable } from "@nestjs/common";
import { User } from "@/user/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, FindOptionsWhere } from "typeorm";
import { FilterUserDto } from "@/user/dto/query-user.dto";
import { SortUserDto } from "@/user/dto/query-user.dto";
import { NullableType } from "@/utils/types/nullable.type";
import { IPaginationOptions } from "@/utils/types/pagination-options";

@Injectable()
export class UserRepository {

    constructor (
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async create(data: User): Promise<User> {
        const newEntity = this.userRepository.create(data);
        return newEntity;
    }

    async findManyWithPagination({
        filterOptions,
        sortOptions,
        paginationOptions,
    }: {
        filterOptions?: FilterUserDto | null;
        sortOptions?: SortUserDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<User[]> {
        const queryBuilder = this.userRepository.createQueryBuilder('user');
        
        if (filterOptions?.roles?.length) {
            queryBuilder
                .innerJoin('user.roles', 'userRole')
                .innerJoin('userRole.role', 'role')
                .andWhere('role.id IN (:...roleIds)', {
                    roleIds: filterOptions.roles.map(role => role.id)
                });
        }

        if (sortOptions?.length) {
            sortOptions.forEach((sort, index) => {
                const method = index === 0 ? 'orderBy' : 'addOrderBy';
                queryBuilder[method](`user.${sort.orderBy}`, sort.order as 'ASC' | 'DESC');
            });
        }

        return queryBuilder
            .skip((paginationOptions.page - 1) * paginationOptions.limit)
            .take(paginationOptions.limit)
            .getMany();
    }

    async findById(id: User['id']): Promise<NullableType<User>> {
        return this.userRepository.findOne({ where: { id: id } });
    }

    async findByEmail(email: User['email']): Promise<NullableType<User>> {
        const entity = this.userRepository.findOne({ where: { email: email } });
        return entity || null;
    }

    async update(id: User['id'], payload: Partial<User>): Promise<User> {
        const entity = await this.userRepository.findOne({ 
            where: { id: id },
            relations: ['roles'] // Load existing roles
        });
        if(!entity) {
            throw new Error('User not found');
        }
        
        // Merge payload into existing entity (preserves relations)
        Object.assign(entity, payload);
        
        const updatedEntity = await this.userRepository.save(entity);
        return updatedEntity;
    }

    async remove(id: User['id']): Promise<void> {
        await this.userRepository.softDelete(id);
    }
}