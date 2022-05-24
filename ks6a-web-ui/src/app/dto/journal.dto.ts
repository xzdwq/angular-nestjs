export interface Journal {
  id: number;
  guid: string;
  createDate?: Date;
  updateDate?: Date;
  customerName?: string;
  contractorName: string;
  estimateId: number;
};
