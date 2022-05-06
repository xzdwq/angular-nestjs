import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// import { MessageMaskService } from '@cmp/message-mask/message-mask.service';
import { ObjectEstimateService } from '@page/object-estimate/object-estimate.service';
import { EstimateService } from '@page/estimate/estimate.service';
import { Estimate, ObjectEstimate } from '@app/dto';

@Component({
  selector: 'app-estimate',
  templateUrl: './estimate.component.html',
  inputs: ['objectEstimateIdSelect'],
  host: { class: 'h-full flex flex-col' },
})
export class EstimateComponent implements OnInit {
  public projectIdSelect!: number;
  public objectEstimateNameSelect!: string;
  public objectEstimateId!: number;
  public estimates: Estimate[] = [];
  public isShowMsg: boolean = false;
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    // private messageMaskService: MessageMaskService,
    private objectEstimateService: ObjectEstimateService,
    private estimateService: EstimateService,
  ) {}

  ngOnInit (): void {
    this.route.params
      .subscribe(params => {
        this.projectIdSelect = +params['projectId'];
        this.objectEstimateId = +params['objectEstimateId'];

        this.objectEstimateService.getObjectEstimate(this.projectIdSelect, this.objectEstimateId)
          .subscribe((objectEstimate: ObjectEstimate[]) => {
            this.objectEstimateNameSelect = objectEstimate[0].code;
          });

        this.estimateService.loadEstimates(this.objectEstimateId)
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
    this.router.navigate([`/project/${this.projectIdSelect}/${this.objectEstimateId}/${estimate.id}`]);
  }

}
