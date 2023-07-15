import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PublicationService {
  constructor(private prismaService: PrismaService) {}

  async create(createPublicationDto: CreatePublicationDto, userId: number) {
    const date = new Date(createPublicationDto.dateToPublish);
    try {
      const publication = await this.prismaService.publication.create({
        data: { ...createPublicationDto, dateToPublish: date, userId },
      });
      return publication;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          `Title "${createPublicationDto.title}" already exists`,
        );
      }
      throw error;
    }
  }

  findAll(userId: number) {
    return this.prismaService.publication.findMany({
      where: { userId },
      select: {
        image: true,
        title: true,
        text: true,
        dateToPublish: true,
        published: true,
        socialMedia: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} publication`;
  }

  update(id: number, updatePublicationDto: UpdatePublicationDto) {
    return `This action updates a #${id} publication`;
  }

  remove(id: number) {
    return `This action removes a #${id} publication`;
  }
}
