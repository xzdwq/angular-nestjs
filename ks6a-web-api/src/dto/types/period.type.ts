import { ReminderEnum } from '@src/dto/types/remainder.type';

export interface Period {
  ks6aItemId: number;
  period: Date;
  volume: number;
  type?: ReminderEnum;
  year?: string;
  reminder?: number;
}
