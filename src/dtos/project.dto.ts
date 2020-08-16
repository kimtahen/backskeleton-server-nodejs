import { IsDefined, IsOptional, IsInt, IsEmail, IsDate } from 'class-validator';
import { DetailedInformation } from '../interfaces/project.interface';

export class CreateProjectDto {
  public email: string;
  public title: string;
  public additionalInfo: DetailedInformation;
  public data: string;
}
