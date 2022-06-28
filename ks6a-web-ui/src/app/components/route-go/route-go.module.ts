import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslocoRootModule } from '@/app/definitions/transloco-root.module';
import { RouteGoComponent } from '@/app/components/route-go/route-go.component';

@NgModule({
  declarations: [
    RouteGoComponent,
  ],
  imports: [
    CommonModule,
    TranslocoRootModule,
  ],
  exports: [
    RouteGoComponent,
  ],
  providers: [],
})
export class RouteGoModule {}
