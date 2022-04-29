import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslocoRootModule } from '@app/transloco-root.module';
import { TabPanelComponent } from '@cmp/tab-panel/tab-panel.component';

@NgModule({
  declarations: [
    TabPanelComponent,
  ],
  imports: [
    CommonModule,
    TranslocoRootModule,
  ],
  exports: [
    TabPanelComponent,
  ],
  providers: [],
})
export class TabPanelModule {}
