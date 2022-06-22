import { IsEmpty, IsNumber, IsDate, IsOptional, IsUUID, IsBoolean, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class Ks6aPeriods {
  @IsEmpty()
  id: number;

  @IsOptional()
  @IsUUID(4)
  guid: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  periodDate?: Date;

  @IsOptional()
  @IsBoolean()
  isFixed: boolean;


  @IsNotEmpty()
  @IsNumber()
  ks6aId: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createDate?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updateDate?: Date;
}
