import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectComponent } from '@page/project/project.component';
import { ObjectEstimateComponent } from '@page/object-estimate/object-estimate.component';
import { EstimateComponent } from '@page/estimate/estimate.component';

const routes: Routes = [
  { path: '', redirectTo: '/project', pathMatch: 'full' },
  {
    path: 'project',
    component: ProjectComponent,
    children: [
      {
        path: ':projectId',
        component: ObjectEstimateComponent,
      },
      {
        path: ':projectId/:objectEstimateId',
        component: EstimateComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
