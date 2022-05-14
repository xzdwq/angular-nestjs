import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ks6a-item',
  templateUrl: './ks6a-item.component.html',
  host: { class: 'h-full flex flex-col' },
})
export class Ks6aItemComponent implements OnInit {
  public projectIdSelect!: number;
  public objectEstimateIdSelect!: number;
  public isShowMsg: boolean = false;
  constructor (
    private route: ActivatedRoute,
  ) {}

  ngOnInit (): void {
    this.route.params
      .subscribe(params => {
        this.projectIdSelect = +params['projectId'];
        this.objectEstimateIdSelect = +params['objectEstimateId'];
      },
    );
  }

}
