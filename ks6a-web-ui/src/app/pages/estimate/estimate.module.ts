import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslocoRootModule } from '@app/transloco-root.module';
import { EstimateComponent } from '@page/estimate/estimate.component';
import { MessageMaskModule } from '@cmp/message-mask/message-mask.module';
import { RouteGoModule } from '@cmp/route-go/route-go.module';
import { HbfContentModule } from '@layout/hbf-content/hbf-content.module';

@NgModule({
  declarations: [
    EstimateComponent,
  ],
  imports: [
    CommonModule,
    TranslocoRootModule,
    MessageMaskModule,
    RouteGoModule,
    HbfContentModule,
  ],
  exports: [
    EstimateComponent,
  ],
  providers: [],
})
export class EstimateModule {}
