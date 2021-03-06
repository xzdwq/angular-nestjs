import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '@app/app-routing.module';
import { TranslocoRootModule } from '@/app/definitions/transloco-root.module';
import { ObjectEstimateComponent } from '@page/object-estimate/object-estimate.component';
import { MessageMaskModule } from '@cmp/message-mask/message-mask.module';
import { HbfContentModule } from '@layout/hbf-content/hbf-content.module';

@NgModule({
  declarations: [
    ObjectEstimateComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
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
