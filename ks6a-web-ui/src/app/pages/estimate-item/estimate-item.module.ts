import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslocoRootModule } from '@app/transloco-root.module';
import { EstimateItemComponent } from '@page/estimate-item/estimate-item.component';
import { MessageMaskModule } from '@cmp/message-mask/message-mask.module';

@NgModule({
  declarations: [
    EstimateItemComponent,
  ],
  imports: [
    CommonModule,
    TranslocoRootModule,
    MessageMaskModule,
  ],
  exports: [],
  providers: [],
})
export class EstimateItemModule {}
