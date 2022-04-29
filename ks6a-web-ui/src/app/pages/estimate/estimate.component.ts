import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageMaskService } from '@cmp/message-mask/message-mask.service';
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
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private messageMaskService: MessageMaskService,
    private estimateService: EstimateService,
  ) {}

  ngOnInit (): void {
    this.route.params
      .subscribe(params => {
        this.projectIdSelect = +params['projectId'];
        this.objectEstimateId = +params['objectEstimateId'];
        this.estimateService.loadEstimates(this.objectEstimateId)
        .subscribe({
          next: (estimates) => {
            this.estimates = estimates;
            if (!this.estimates.length) {
              this.messageMaskService.setIsShowMsg({ subRaw: EstimateComponent.name });
              this.isShowMsg = true;
            } else {
              this.isShowMsg = false;
            }
          },
          error: (err) => {
            this.messageMaskService.setIsShowMsg({ type: 'danger', msgRaw: err.message, subRaw: EstimateComponent.name });
            this.isShowMsg = true;
          },
        });
      });
  }

  // Выбор конкретной сметы из оъекта сметы
  handlerEstimate (estimate: Estimate): void {
    this.router.navigate([`/project/${this.projectIdSelect}/${this.objectEstimateId}/${estimate.id}`]);
  }

}
