import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthUser } from 'src/auth/decorators/authenticated-user.decorator';
import { User } from '@prisma/client';

@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createPublicationDto: CreatePublicationDto,
    @AuthUser() user: User,
  ) {
    return this.publicationService.create(createPublicationDto, user.id);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@AuthUser() user: User) {
    return this.publicationService.findAll(user.id);
  }

  //TODO
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.publicationService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePublicationDto: UpdatePublicationDto) {
  //   return this.publicationService.update(+id, updatePublicationDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.publicationService.remove(+id);
  // }
}
