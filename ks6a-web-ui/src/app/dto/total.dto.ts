export interface Total {
  id: number;
  guid: string;
  quantityVolume: number;
  quantitySum: number;
  customerVolume: number;
  customerSum: number;
  subcontractorVolume: number;
  subcontractorSum: number;
  remainderVolume: number;
  remainderSum: number;
  createDate?: Date;
  updateDate?: Date;
};
