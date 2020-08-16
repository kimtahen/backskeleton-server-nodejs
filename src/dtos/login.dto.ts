import {IsString,IsEmail} from 'class-validator';

export class LoginDto{
  @IsEmail()
  public id: string;
  @IsString()
  public pw: string;
}
