import { IsEmpty, IsNumber, IsString, IsDate, IsOptional, IsUUID, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class Journal {
  @IsEmpty()
  id: number;

  @IsOptional()
  @IsUUID(4)
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
  @IsString()
  @MaxLength(1024)
  customerName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1024)
  contractorName: string;

  @IsOptional()
  @IsNumber()
  estimateId: number;
}
