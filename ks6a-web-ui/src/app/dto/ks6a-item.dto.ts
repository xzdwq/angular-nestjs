import { Execution, Ks6a, Remainder, Total, Ks6aItemContractors } from '@app/dto';

export interface Ks6aItem {
  id: number;
  guid: string;
  createDate?: Date;
  updateDate?: Date;
  number?: number;
  code?: string;
  unitMeasure?: string;
  volume?: number;
  price?: number;
  cost?: number;
  section?: string;
  name?: string;
  kks?: string;
  wbsCode?: string;
  cbsCodeI?: string;
  cbsCodeII?: string;
  estimateId: number;
  ks6aId: number;
  executions: Execution[];
  ks6a: Ks6a;
  remainders: Remainder[];
  total: Total;
  ks6aItemContractors: Ks6aItemContractors[];
};
