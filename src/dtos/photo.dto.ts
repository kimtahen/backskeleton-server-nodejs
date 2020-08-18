import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreatePhotoDto {
  @IsOptional()
  tags: string[];
  instagramId: string;
  likes: number;
  bookmarks: number;
  commentIds: string[];

  @IsString()
  userId: string;
  title: string;
  content: string;
  titleImageName: string;

  @IsArray()
  detailImageNames: string[];
}
