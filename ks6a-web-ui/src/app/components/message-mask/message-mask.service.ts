import { Injectable } from "@angular/core";

import { MsgParamsType } from '@cmp/message-mask/msg-type';

@Injectable({
  providedIn: 'root',
})
export class MessageMaskService {
  /** Тип сообщения
   * info - Информационный
   * warning - Предупреждение
   * danger - Ошибка
   */
  public type: string = 'info';
  public iconName: string = 'info';
  public msgLang: string = 'dataEmpty';
  public msgRaw: string = '';
  public subRaw: string = '';
  constructor () {}

  setIsShowMsg (params: MsgParamsType): void {
    this.type = !params.type ? 'info' : params.type;

    let iconName = 'info';
    if (!params.iconName) {
      if (this.type === 'warning') iconName = 'warning';
      if (this.type === 'danger') iconName = 'error';
    }
    this.iconName = iconName;

    if (params.msgLang) this.msgLang = params.msgLang;
    this.msgRaw = params.msgRaw || '';
    this.subRaw = params.subRaw || '';
  }

  getMsgParams (): MsgParamsType {
    return {
      type: this.type,
      iconName: this.iconName,
      msgLang: this.msgLang,
      msgRaw: this.msgRaw,
      subRaw: this.subRaw,
    }
  }
}
