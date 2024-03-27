import { Body, Controller, Get, HttpCode, HttpStatus, Post, } from '@nestjs/common';
import { UserService } from './user.service';
import { user } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get("/getUser")
  async getUser(): Promise<user[]>{
    return this.userService.getUser()
  }

  @Post("/createUser")
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() body): Promise<user> {
    return this.userService.createUser(body);
  }

  
}