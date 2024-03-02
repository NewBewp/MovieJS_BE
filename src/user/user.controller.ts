import { Body, Controller, Get, Post, } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get("/getUser")
  getUser(){
    return this.userService.getUser()
  }

  @Post("/createUser")
  createUser(@Body() body){
    return this.userService.createUser(body)
  }
}
