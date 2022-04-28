import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadMaskService } from '@cmp/load-mask/load-mask.service';
import { LoadMaskComponent } from '@cmp/load-mask/load-mask.component';

@NgModule({
  declarations: [
    LoadMaskComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LoadMaskComponent,
  ],
  providers: [
    LoadMaskService,
  ],
})
export class LoadMaskModule {}
