import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslocoRootModule } from '@/app/definitions/transloco-root.module';
import { Ks6aItemComponent } from '@page/ks6a-item/ks6a-item.component';
import { MessageMaskModule } from '@cmp/message-mask/message-mask.module';
import { HbfContentModule } from '@layout/hbf-content/hbf-content.module';
import { NgZorroAntdModule } from '@/app/definitions/ng-zorro-antd.registry.module';

@NgModule({
  declarations: [
    Ks6aItemComponent,
  ],
  imports: [
    CommonModule,
    TranslocoRootModule,
    MessageMaskModule,
    HbfContentModule,
    FormsModule,
    NgZorroAntdModule,
  ],
  exports: [],
  providers: [],
})
export class Ks6aItemModule {}
