import { IsEmpty, IsNumber, IsDate, IsOptional, IsUUID, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class Reminder {
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
  @IsNumber()
  volume?: number;

  @IsOptional()
  @IsNumber()
  ks6aItemId: number;

  @IsOptional()
  @IsString()
  year?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  periodDate?: Date;
}
