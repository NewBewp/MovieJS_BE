import { Body, Controller, Get, NotFoundException, Post, } from '@nestjs/common';
import { UserService } from './user.service';
import { user } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get("/getUser")
  getUser(): Promise<user[]>{
    return this.userService.getUser()
  }

  @Post("/createUser")
  createUser(@Body() body){
    try {
      return this.userService.createUser(body)
    } catch (error) {
      throw new error
    }    
  }
}