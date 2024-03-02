import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {

    prisma = new PrismaClient()

    async getUser(){
        let data = await this.prisma.user.findMany()
        return data
    }

    async createUser(body){
        let data = await this.prisma.user.create({data:body})
        return data
    }
}
