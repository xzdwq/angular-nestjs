import { PeriodType } from '@app/dto';

export interface Ks6aPeriods {
  id: number;
  guid: string;
  periodDate: Date;
  isFixed: boolean;
  ks6aId: number;
  periodType: PeriodType,
  createDate?: Date;
  updateDate?: Date;
}
