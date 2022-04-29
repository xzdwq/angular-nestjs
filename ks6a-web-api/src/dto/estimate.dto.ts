export interface Estimate {
  id: string;
  createDate?: Date;
  updateDate?: Date;
  sorting?: number;
  objectEstimateId: string;
  code: string;
  name: string;
  nameEng?: string;
  localEstimateNumber: string;
};
