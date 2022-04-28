import { Component, OnInit } from '@angular/core';

import { MessageMaskService } from '@cmp/message-mask/message-mask.service';
import { MsgParamsType } from '@cmp/message-mask/msg-type';

@Component({
  selector: 'app-message-mask',
  templateUrl: './message-mask.component.html',
  inputs: ['isShowMsg'],
})
export class MessageMaskComponent implements OnInit {
  public isShowMsg: boolean = false;
  public msgParams!: MsgParamsType;
  constructor (
    public messageMaskService: MessageMaskService,
  ) {}

  ngOnInit (): void {
    if (this.isShowMsg) this.msgParams = this.messageMaskService.getMsgParams();
  }

}
