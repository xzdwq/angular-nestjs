import { IsEmpty, IsNumber, IsDate, IsOptional, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class Execution {
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
  @IsDate()
  @Type(() => Date)
  periodDate?: Date;

  @IsOptional()
  @IsNumber()
  volume?: number;

  @IsOptional()
  @IsNumber()
  ks6aItemId: number;

  @IsOptional()
  @Type((val) => val ? Number: null)
  ks6aItemContractorId: number | null;
}
