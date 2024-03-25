import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient, user } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
@Injectable()
export class UserService {
  prisma = new PrismaClient();

  getUser(): Promise<user[]> {
    const data = this.prisma.user.findMany({
      include: {
        role: true
      }
    });
    return data;
  }


  async createUser(body) {
    try {
      const data = await this.prisma.user.create({ data: body });
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
}