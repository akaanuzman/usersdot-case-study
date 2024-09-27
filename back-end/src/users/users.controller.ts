import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly UsersService: UsersService) {}

    @Get()
    async getUsers(
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize: number = 10,
        @Query('search') search: string = ''
    ) {
        return await this.UsersService.getUsers(page, pageSize, search);
    }

    @Get(':id')
    async getUserById(@Param('id') id: number) {
        const user = await this.UsersService.getUserById(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
}
