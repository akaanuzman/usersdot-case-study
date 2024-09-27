import { Controller, Get, Query } from '@nestjs/common';
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
}
