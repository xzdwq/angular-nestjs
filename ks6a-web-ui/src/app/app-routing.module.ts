import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectComponent } from '@page/project/project.component';
import { ObjectEstimateComponent } from '@page/object-estimate/object-estimate.component';
import { EstimateComponent } from '@page/estimate/estimate.component';
import { EstimateItemComponent } from '@page/estimate-item/estimate-item.component';
import { ProjectService } from '@page/project/project.service';
import { ObjectEstimateService } from '@page/object-estimate/object-estimate.service';
// import { EstimateService } from '@page/estimate/estimate.service';
import { ObjectEstimate, Project } from '@app/dto';

const routes: Routes = [
  { path: '', redirectTo: '/project', pathMatch: 'full' },
  {
    path: 'project',
    component: ProjectComponent,
    children: [
      {
        path: ':projectId',
        component: ObjectEstimateComponent,
        data: { breadcrumb: (data: { response: Project[] }) => `${data.response[0]?.name}` },
        resolve: { response: ProjectService },
      },
      {
        path: ':projectId/:objectEstimateId',
        component: EstimateComponent,
        data: { breadcrumb: (data: { response: ObjectEstimate[] }) => `${data.response[0]?.code}` },
        resolve: { response: ObjectEstimateService },
      },
      {
        path: ':projectId/:objectEstimateId/:estimateItemId',
        component: EstimateItemComponent,
        // data: { breadcrumb: (data: { response: ObjectEstimate[] }) => `${data.response[0]?.code}` },
        // resolve: { response: ObjectEstimateService },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
