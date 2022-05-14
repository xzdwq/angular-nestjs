import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResizeColumnTableDirective } from '@app/core/directives/resize-column-table.directive';
import { HbfContentComponent } from '@layout/hbf-content/hbf-content.component';



@NgModule({
  declarations: [
    HbfContentComponent,
    ResizeColumnTableDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [HbfContentComponent],
})
export class HbfContentModule {}
