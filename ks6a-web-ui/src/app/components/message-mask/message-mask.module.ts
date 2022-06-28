import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslocoRootModule } from '@/app/definitions/transloco-root.module';
import { MessageMaskComponent } from '@cmp/message-mask/message-mask.component';
import { MessageMaskService } from '@cmp/message-mask/message-mask.service';

@NgModule({
  declarations: [
    MessageMaskComponent,
  ],
  imports: [
    CommonModule,
    TranslocoRootModule,
  ],
  exports: [
    MessageMaskComponent,
  ],
  providers: [
    MessageMaskService,
  ],
})
export class MessageMaskModule {}
