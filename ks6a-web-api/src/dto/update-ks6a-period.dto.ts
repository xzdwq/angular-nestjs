import { IsNumber, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateKs6aPeriod {
  @IsOptional()
  @IsNumber()
  ks6aId?: number;

  @IsOptional()
  @IsNumber()
  estimateId?: number;

  @IsNumber()
  ks6aPeriodId: number;

  @IsDate()
  @Type(() => Date)
  newPeriod: Date;
}
