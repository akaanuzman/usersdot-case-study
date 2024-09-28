import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';

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

    @Post('save')
    async saveUser(@Body() createUserDTO: CreateUserDTO) {
        return await this.UsersService.saveUser(createUserDTO);
    }

    @Post('update')
    async updateUser(@Body() updateUserDTO: UpdateUserDTO) {
        return await this.UsersService.updateUser(updateUserDTO);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number) {
        const result = await this.UsersService.deleteUser(id);
        if (result) {
            return { message: 'User deleted successfully' };
        } else {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }
}
