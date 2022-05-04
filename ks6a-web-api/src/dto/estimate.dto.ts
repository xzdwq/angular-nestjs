import { IsEmpty, IsNotEmpty, IsNumber, IsString, IsDate, IsOptional, IsUUID, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class Estimate {
  @IsEmpty()
  id: number;

  @IsUUID(4)
  @IsNotEmpty()
  guid: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createDate?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updateDate?: Date;

  @IsOptional()
  @IsNumber()
  sorting?: number;

  @IsNotEmpty()
  @IsNumber()
  objectEstimateId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  code: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1024)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1024)
  nameEng?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1024)
  localEstimateNumber: string;
}
