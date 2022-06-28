import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '@app/app-routing.module';
import { TranslocoRootModule } from '@/app/definitions/transloco-root.module';
import { EstimateComponent } from '@page/estimate/estimate.component';
import { MessageMaskModule } from '@cmp/message-mask/message-mask.module';
import { HbfContentModule } from '@layout/hbf-content/hbf-content.module';

@NgModule({
  declarations: [
    EstimateComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    TranslocoRootModule,
    MessageMaskModule,
    HbfContentModule,
  ],
  exports: [
    EstimateComponent,
  ],
  providers: [],
})
export class EstimateModule {}
