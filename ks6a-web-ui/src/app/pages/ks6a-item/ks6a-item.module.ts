import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslocoRootModule } from '@app/transloco-root.module';
import { Ks6aItemComponent } from '@page/ks6a-item/ks6a-item.component';
import { MessageMaskModule } from '@cmp/message-mask/message-mask.module';
import { HbfContentModule } from '@layout/hbf-content/hbf-content.module';

@NgModule({
  declarations: [
    Ks6aItemComponent,
  ],
  imports: [
    CommonModule,
    TranslocoRootModule,
    MessageMaskModule,
    HbfContentModule,
  ],
  exports: [],
  providers: [],
})
export class Ks6aItemModule {}
