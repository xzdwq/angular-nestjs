export interface Estimate {
  id: number;
  guid: string;
  createDate?: Date;
  updateDate?: Date;
  sorting?: number;
  objectEstimateId: string;
  code: string;
  name: string;
  nameEng?: string;
  localEstimateNumber: string;
};
