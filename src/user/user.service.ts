import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
      const user = await this.prismaService.user.create({
        data: createUserDto,
      });
      return user;
    } catch (error) {
      console.log(error);
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('User already exists');
      } else throw error;
    }
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    return user;
  }
}
