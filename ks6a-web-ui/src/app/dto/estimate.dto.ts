export interface Estimate {
	id: number;
  createDate?: Date;
  updateDate?: Date;
  sorting?: number;
  objectEstimateId: number;
	code: string;
	name: string;
  nameEng?: string;
  localEstimateNumber: string;
};
