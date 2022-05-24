import { ReminderEnum } from '@app/dto/types/remainder.type';

export interface Reminder {
  id: number;
  guid: string;
  createDate?: Date;
  updateDate?: Date;
  type: ReminderEnum;
  volume?: number;
  ks6aItemId: number;
};
