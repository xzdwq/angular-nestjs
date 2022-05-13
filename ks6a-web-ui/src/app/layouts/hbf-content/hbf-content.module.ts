import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HbfContentComponent } from '@layout/hbf-content/hbf-content.component';



@NgModule({
  declarations: [
    HbfContentComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [HbfContentComponent],
})
export class HbfContentModule {}
