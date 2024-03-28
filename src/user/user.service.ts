import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient, user } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt'
import { userLogin, userType } from './entities/user.entities';
@Injectable()
export class UserService {
  prisma = new PrismaClient();

  async getUser(): Promise<user[]> {
    try {
      const data = this.prisma.user.findMany({
        include: {
          role: true
        }
      });
      return data;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // Handle known errors here
        throw new HttpException('A database error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      // Generic error handling
      throw new HttpException('An unexpected error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createUser(body: user): Promise<user> {
    const hashedPassword = await bcrypt.hash(body.password,10);
    const userData = {...body, password: hashedPassword}
    try {
      const data = await this.prisma.user.create({ data: userData })
      return data;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // 'P2002' is the code for unique constraint violation in Prisma
        if (error.code === 'P2002') {
          throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
        }
      }
      throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async validateUser(bodyLogin : userLogin): Promise<userType>{
    const user = await this.prisma.user.findUnique({
      where: {email: bodyLogin.email},
    });
    if(user && await bcrypt.compare(bodyLogin.password, user.password)){
      return user as userType
    }
    return null
  }

}