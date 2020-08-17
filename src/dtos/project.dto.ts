import { IsDefined, IsOptional, IsIn, IsEmail, IsDate } from 'class-validator';

export class CreateProjectDto {
  public author: string;
  public title: string;
  public additionalInfo: DetailedInformation;
  public data: string;
}
class DetailedInformation {
  public spaceType: number;
  public roomSize: number;
  public workType: number;
  public category: number;
  public familyType: number;
  public region: string;
  public style: string;
  public period: string;
  public budget: number;
  public entireTone: string;
  public wallColor: string;
  public floorColor: string;
  public details: string;
  public link: string;
  public copyright: string;
}

// class 중첩 ??
