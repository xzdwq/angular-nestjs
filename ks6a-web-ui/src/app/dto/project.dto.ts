export interface Project {
  id: number;
  guid: string;
  createDate?: Date;
  updateDate?: Date;
  sorting?: number;
  code: string;
  name: string;
  nameEn?: string;
};
