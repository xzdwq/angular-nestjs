import { IsEmpty, IsNotEmpty, IsNumber, IsString, IsDate, IsOptional, IsUUID, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class ObjectEstimate {
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
  projectId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  code: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1024)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(1024)
  nameEng?: string;
}
