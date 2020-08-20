import { IsString, IsOptional } from 'class-validator';

export class CreateCommentDto {
  userId: string;
  @IsString()
  content: string;
}

