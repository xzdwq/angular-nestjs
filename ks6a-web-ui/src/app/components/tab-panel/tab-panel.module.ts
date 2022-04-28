import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabPanelComponent } from '@cmp/tab-panel/tab-panel.component';

@NgModule({
  declarations: [
    TabPanelComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    TabPanelComponent,
  ],
  providers: [],
})
export class TabPanelModule {}
