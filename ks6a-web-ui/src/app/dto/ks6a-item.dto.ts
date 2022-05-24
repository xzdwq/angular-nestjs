import { Execution, Journal, Reminder } from '@app/dto';

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
  journalId: number;
  execution: Execution[];
  journal: Journal;
  remainder: Reminder[];
};
