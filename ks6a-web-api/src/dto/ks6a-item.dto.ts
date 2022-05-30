import { IsEmpty, IsNotEmpty, IsNumber, IsString, IsDate, IsOptional, IsUUID, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class Ks6aItem {
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
  number?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  code?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  unitMeasure?: string;

  @IsOptional()
  @IsNumber()
  volume?: number;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  cost?: number;

  @IsOptional()
  @IsString()
  @MaxLength(1024)
  section?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1024)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  kks?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  wbsCode?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  cbsCodeI?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  cbsCodeII?: string;

  @IsOptional()
  @IsNumber()
  estimateId: number;

  @IsOptional()
  @IsNumber()
  ks6aId: number;

  @IsOptional()
  @IsNumber()
  totalId?: number;
}
