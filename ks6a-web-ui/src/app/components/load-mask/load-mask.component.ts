import { Component, OnInit } from '@angular/core';
import { asapScheduler } from 'rxjs';

import { LoadMaskService } from '@cmp/load-mask/load-mask.service';

@Component({
  selector: 'app-load-mask',
  templateUrl: './load-mask.component.html',
  inputs: ['iconName', 'spinerSize', 'delayClose'],
})
export class LoadMaskComponent implements OnInit {
  public isShow: boolean = false;
  public iconName!: string;
  public spinerSize: number = 50;
  public delayClose: number = 0;
  constructor (
    private loadMaskService: LoadMaskService,
  ) {}

  ngOnInit (): void {
    this.loadMaskService.getLoad()
      .subscribe(isLoad => {
        isLoad ? this.isShow = isLoad : this.deleteLoadMask();
      },
    );
  }

  deleteLoadMask (): void {
    asapScheduler.schedule(() => this.isShow = false, this.delayClose);
  }

}
