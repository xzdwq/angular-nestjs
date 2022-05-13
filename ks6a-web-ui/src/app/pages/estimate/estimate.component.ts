import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EstimateService } from '@page/estimate/estimate.service';
import { Estimate } from '@app/dto';

@Component({
  selector: 'app-estimate',
  templateUrl: './estimate.component.html',
  inputs: ['objectEstimateIdSelect'],
  host: { class: 'h-full flex flex-col' },
})
export class EstimateComponent implements OnInit {
  public projectIdSelect!: number;
  public objectEstimateId!: number;
  public estimates: Estimate[] = [];
  public isShowMsg: boolean = false;
  public componentShow: boolean = false;
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private estimateService: EstimateService,
  ) {}

  ngOnInit (): void {
    this.route.params
      .subscribe(params => {
        this.projectIdSelect = +params['projectId'];
        this.objectEstimateId = +params['objectEstimateId'];

        this.estimateService.fetchEstimates(this.objectEstimateId)
        .subscribe({
          next: (estimates) => {
            this.estimates = estimates;
            this.isShowMsg = !this.estimates.length ? true : false;
          },
          error: () => this.isShowMsg = true,
        });
      });
  }

  // Выбор конкретной сметы из оъекта сметы
  handlerEstimate (estimate: Estimate): void {
    this.router.navigate([`${estimate.id}`], { relativeTo: this.route });
  }

}
