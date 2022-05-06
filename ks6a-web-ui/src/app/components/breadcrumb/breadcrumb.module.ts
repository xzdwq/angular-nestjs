import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrumbComponent } from '@cmp/breadcrumb/breadcrumb.component';
import { BreadcrumbService } from '@cmp/breadcrumb/breadcrumb.service';

@NgModule({
  declarations: [
    BreadcrumbComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    BreadcrumbComponent,
  ],
  providers: [
    BreadcrumbService,
  ],
})
export class BreadcrumbModule {}
