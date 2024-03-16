import { Injectable } from '@nestjs/common';
// eslint-disable-next-line prettier/prettier
import {  PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  prisma = new PrismaClient();

  async getUser() {
    const data = await this.prisma.user.findMany();
    return data;
  }

  async createUser(body) {
    const data = await this.prisma.user.create({ data: body });
    return data;
  }
}
