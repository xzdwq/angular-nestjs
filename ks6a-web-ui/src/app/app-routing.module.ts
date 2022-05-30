import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

import { ProjectComponent } from '@page/project/project.component';
import { ObjectEstimateComponent } from '@page/object-estimate/object-estimate.component';
import { EstimateComponent } from '@page/estimate/estimate.component';
import { Ks6aItemComponent } from '@page/ks6a-item/ks6a-item.component';
import { ProjectService } from '@page/project/project.service';
import { ObjectEstimateService } from '@page/object-estimate/object-estimate.service';
import { EstimateService } from '@page/estimate/estimate.service';
import { ObjectEstimate, Project } from '@app/dto';

const routes: Routes = [
  { path: '', redirectTo: '/project/1', pathMatch: 'full' },
  {
    path: 'project',
    component: ProjectComponent,
    children: [
      {
        path: ':projectId',
        component: ObjectEstimateComponent,
        data: {
          breadcrumb: (data: { response: Project }) => data.response,
          langProp: { ru: 'name', en: 'nameEng' },
        },
        resolve: { response: ProjectService },
        children: [
          {
            path: ':objectEstimateId',
            component: EstimateComponent,
            data: {
              breadcrumb: (data: { response: ObjectEstimate }) => `${data.response?.code}`,
              langProp: null,
            },
            resolve: { response: ObjectEstimateService },
            children: [
              {
                path: ':estimateId',
                component: Ks6aItemComponent,
                data: {
                  breadcrumb: (data: { response: ObjectEstimate }) => `${data.response?.code}`,
                  langProp: null,
                },
                resolve: { response: EstimateService },
              },
            ],
          },
        ],
      },
    ],
  },
];

export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routingConfiguration)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
