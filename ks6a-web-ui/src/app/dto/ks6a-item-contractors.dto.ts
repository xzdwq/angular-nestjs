import { Contractor, Execution, Total } from '@app/dto';

export interface Ks6aItemContractors {
  id: number;
  guid: string;
  ks6aItemId: number;
  contractor: Contractor
  contractorGuid: string;
  totalId: number;
  createDate: Date;
  updateDate: Date;
  executions: Execution[];
  total: Total;
};
