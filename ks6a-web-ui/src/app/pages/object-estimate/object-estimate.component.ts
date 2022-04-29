import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageMaskService } from '@cmp/message-mask/message-mask.service';
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
    private messageMaskService: MessageMaskService,
    private objectEstimateService: ObjectEstimateService,
  ) {}

  ngOnInit (): void {
    this.route.params.subscribe(params => {
      this.projectIdSelect = params['projectId'];
      this.objectEstimateService.loadObjectEstimates(this.projectIdSelect)
        .subscribe({
          next: (objectEstimates) => {
            this.objectEstimates = objectEstimates;
            if (!this.objectEstimates.length) {
              this.messageMaskService.setIsShowMsg({ subRaw: ObjectEstimateComponent.name });
              this.isShowMsg = true;
            } else {
              this.isShowMsg = false;
            }
          },
          error: (err) => {
            this.messageMaskService.setIsShowMsg({ type: 'danger', msgRaw: err.message, subRaw: ObjectEstimateComponent.name });
            this.isShowMsg = true;
          },
        });
    });
  }

  // Выбор конкретного объекта сметы из проекта
  handlerObjectEstimate (objectEstimate: ObjectEstimate): void {
    this.router.navigate([`/project/${this.projectIdSelect}/${objectEstimate.id}`]);
  }

}
