import { Ks6aPeriods } from '@app/dto';

export interface Ks6a {
  id: number;
  guid: string;
  createDate?: Date;
  updateDate?: Date;
  customerName?: string;
  contractorName: string;
  estimateId: number;
  ks6aPeriods: Ks6aPeriods[];
};
