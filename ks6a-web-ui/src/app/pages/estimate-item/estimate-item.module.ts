import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslocoRootModule } from '@app/transloco-root.module';
import { EstimateItemComponent } from '@page/estimate-item/estimate-item.component';
import { RouteGoModule } from '@cmp/route-go/route-go.module';

@NgModule({
  declarations: [
    EstimateItemComponent,
  ],
  imports: [
    CommonModule,
    TranslocoRootModule,
    RouteGoModule,
  ],
  exports: [],
  providers: [],
})
export class EstimateItemModule {}
