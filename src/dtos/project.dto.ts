import { IsDefined, IsOptional,IsString, IsIn, IsEmail, IsDate, IsObject } from 'class-validator';

class DetailedInformation {

  @IsString()
  public spaceType: number;
  public roomSize: number;
  public workType: number;
  public category: number;
  public familyType: number;

  @IsOptional()
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
export class CreateProjectDto {
  @IsString()
  public title: string;
  public titleImage: string;
  public content: string;

  public userId: string;
  public additionalInfo: DetailedInformation;
}

// class 중첩 ??
