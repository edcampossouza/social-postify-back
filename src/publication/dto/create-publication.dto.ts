import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreatePublicationDto {
  @IsString()
  image: string;

  @IsString()
  title: string;

  @IsString()
  text: string;

  @IsDateString()
  @Matches(/\d{4}-\d{2}-\d{2}/)
  dateToPublish: string;

  @IsOptional()
  @IsBoolean()
  published: boolean;

  @IsString()
  socialMedia: string;
}
