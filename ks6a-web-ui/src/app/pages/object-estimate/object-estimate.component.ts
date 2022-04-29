import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ObjectEstimateService } from '@page/object-estimate/object-estimate.service';
import { ObjectEstimate } from '@app/dto';

@Component({
  selector: 'app-object-estimate',
  templateUrl: './object-estimate.component.html',
  host: { class: 'h-full flex flex-col' },
})
export class ObjectEstimateComponent implements OnInit {
  public projectIdSelect!: number;
  public objectEstimates: ObjectEstimate[] = [];
  public isShowMsg: boolean = false;
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private objectEstimateService: ObjectEstimateService,
  ) {}

  ngOnInit (): void {
    this.route.params.subscribe(params => {
      this.projectIdSelect = params['projectId'];
      this.objectEstimateService.loadObjectEstimates(this.projectIdSelect)
        .subscribe({
          next: (objectEstimates) => {
            this.objectEstimates = objectEstimates;
            this.isShowMsg = !this.objectEstimates.length ? true : false;
          },
          error: () => this.isShowMsg = true,
        });
    });
  }

  // Выбор конкретного объекта сметы из проекта
  handlerObjectEstimate (objectEstimate: ObjectEstimate): void {
    this.router.navigate([`/project/${this.projectIdSelect}/${objectEstimate.id}`]);
  }

}
