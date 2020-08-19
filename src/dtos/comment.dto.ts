import { IsString, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  userId: string;
  content: string;
}

