import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, } from '@nestjs/common';
import { UserService } from './user.service';
import { user } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { userLogin, userType } from './entities/user.entities';

@ApiTags("USER")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Get("/getUser")
  async getUser(): Promise<userType[]> {
    return this.userService.getUser()
  }

  @Post("/createUser")
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() body: userType): Promise<userType> {
    return this.userService.createUser(body);
  }

  @Post("/login")
  async login(@Body() loginDetails: userLogin): Promise<{
    message: string; userId: number
  }> {
    const user = await this.userService.validateUser(loginDetails);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return { message: 'Login successful', userId: user.user_id };
  }

}