import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectComponent } from '@page/project/project.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { TranslocoRootModule } from '@app/transloco-root.module';
import { MessageMaskModule } from '@cmp/message-mask/message-mask.module';
import { LoadMaskModule } from '@cmp/load-mask/load-mask.module';
import { ObjectEstimateModule } from '@page/object-estimate/object-estimate.module';
import { EstimateModule } from '@page/estimate/estimate.module';
import { EstimateItemModule } from '@page/estimate-item/estimate-item.module';
import { TabPanelModule } from '@cmp/tab-panel/tab-panel.module';
import { BreadcrumbModule } from '@cmp/breadcrumb/breadcrumb.module';

@NgModule({
  declarations: [
    ProjectComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    TranslocoRootModule,
    MessageMaskModule,
    LoadMaskModule,
    TabPanelModule,
    BreadcrumbModule,
    ObjectEstimateModule,
    EstimateModule,
    EstimateItemModule,
  ],
  exports: [
    ProjectComponent,
  ],
  providers: [],
})
export class ProjectModule {}
