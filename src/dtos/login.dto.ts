import {IsString} from 'class-validator';

export class LoginDto{
  @IsString()
  public id: string;
  public pw: string;
}
