import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { TranslocoRootModule } from '@app/transloco-root.module';
import { ToolBarComponent } from '@cmp/tool-bar/tool-bar.component';

@NgModule({
  declarations: [ToolBarComponent],
  imports: [
    CommonModule,
    TranslocoRootModule,
    NgSelectModule,
    FormsModule,
  ],
  exports: [ToolBarComponent],
  providers: [],
})
export class ToolBarModule {}
