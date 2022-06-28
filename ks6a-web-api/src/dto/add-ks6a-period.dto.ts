import { IsNumber } from 'class-validator';

export class AddKs6aPeriod {

  @IsNumber()
  ks6aId: number;

  @IsNumber()
  estimateId: number;
}
