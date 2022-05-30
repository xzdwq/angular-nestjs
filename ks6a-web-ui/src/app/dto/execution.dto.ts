export interface Execution {
  id: number;
  guid: string;
  createDate?: Date;
  updateDate?: Date;
  periodDate: Date;
  volume?: number;
  ks6aItemId: number;
  ks6aItemContractorId: number | null;
};
