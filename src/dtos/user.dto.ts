import { IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  public status: string;
  public _type: string;

  @IsString()
  public name: string;
  public password: string;

  @IsEmail()
  public email: string;
}
