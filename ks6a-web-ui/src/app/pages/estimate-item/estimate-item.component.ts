import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estimate-item',
  templateUrl: './estimate-item.component.html',
  host: { class: 'h-full flex flex-col' },
})
export class EstimateItemComponent implements OnInit {
  public projectIdSelect!: number;
  public objectEstimateIdSelect!: number;
  constructor (
    private route: ActivatedRoute,
  ) {}

  ngOnInit (): void {
    this.route.params
      .subscribe(params => {
        this.projectIdSelect = +params['projectId'];
        this.objectEstimateIdSelect = +params['objectEstimateId'];
      }
    );
  }

}
