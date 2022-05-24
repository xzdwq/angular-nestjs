import { IsEmpty, IsNumber, IsDate, IsOptional, IsUUID, IsNotEmpty, IsEnum, IsString } from 'class-validator';
import { Type } from 'class-transformer';

import { ReminderEnum } from '@src/dto/types/remainder.type';

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

  @IsNotEmpty()
  @IsString()
  @IsEnum(ReminderEnum)
  type: string;

  @IsOptional()
  @IsNumber()
  volume?: number;

  @IsOptional()
  @IsNumber()
  ks6aItemId: number;
}
