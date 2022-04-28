import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslocoRootModule } from '@app/transloco-root.module';
import { ObjectEstimateComponent } from '@page/object-estimate/object-estimate.component';
import { MessageMaskModule } from '@cmp/message-mask/message-mask.module';
import { HbfContentModule } from '@layout/hbf-content/hbf-content.module';

@NgModule({
  declarations: [
    ObjectEstimateComponent,
  ],
  imports: [
    CommonModule,
    TranslocoRootModule,
    MessageMaskModule,
    HbfContentModule,
  ],
  exports: [
    ObjectEstimateComponent,
  ],
  providers: [],
})
export class ObjectEstimateModule {}
