import { IsString, IsOptional } from 'class-validator';

export class CreateCommentDto {
  userId: string;
  upperRef: string;
  @IsString()
  content: string;
}

