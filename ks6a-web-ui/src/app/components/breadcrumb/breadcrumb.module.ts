import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbComponent } from '@cmp/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    BreadcrumbComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    BreadcrumbComponent,
  ],
  providers: [],
})
export class BreadcrumbModule {}
