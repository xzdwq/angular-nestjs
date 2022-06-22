import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslocoRootModule } from '@app/transloco-root.module';
import { SettingComponent } from '@page/setting/setting.component';

@NgModule({
  declarations: [
    SettingComponent,
  ],
  imports: [
    CommonModule,
    TranslocoRootModule,
  ],
  exports: [],
  providers: [],
})
export class SettingModule {}
