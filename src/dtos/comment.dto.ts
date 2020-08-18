import { IsString, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsOptional()
  likes: number;

  @IsString()
  photoId: string;
  userId: string;
  content: string;
}
