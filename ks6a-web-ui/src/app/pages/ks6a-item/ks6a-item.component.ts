import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { format } from 'date-fns';
import { enGB, ru } from 'date-fns/locale';

import { Ks6aItemService } from '@page/ks6a-item/ks6a-item.service';
import { Ks6aItem, Execution, Ks6aItemContractors } from '@app/dto';

@Component({
  selector: 'app-ks6a-item',
  templateUrl: './ks6a-item.component.html',
  host: { class: 'h-full flex flex-col' },
})
export class Ks6aItemComponent implements OnInit {
  public projectIdSelect!: number;
  public estimateIdSelect!: number;
  public ks6aItems: Ks6aItem[] = [];
  public isShowMsg: boolean = false;
  public executions: Execution[] = [];
  constructor (
    private route: ActivatedRoute,
    private ks6aItemService: Ks6aItemService,
    private translocoService: TranslocoService,
  ) {}

  ngOnInit (): void {
    this.route.params
      .subscribe(params => {
        this.projectIdSelect = +params['projectId'];
        this.estimateIdSelect = +params['estimateId'];

        this.ks6aItemService.fetchKs6aItems(this.estimateIdSelect)
        .subscribe({
          next: (ks6aItems) => {

            const items: any[] = [];
            ks6aItems.forEach((k: Ks6aItem) => {
              k.ks6aItemContractors.forEach((ik: Ks6aItemContractors) => {
                items.push(ik);
              });
              k.executions.forEach((e: Execution) => {
                const matchPeriodDate = this.executions.find((pe: Execution) => (pe.periodDate === e.periodDate && pe.ks6aItemId === e.ks6aItemId));
                if (!matchPeriodDate) this.executions.push(e);
              });
            });
            this.ks6aItems = ks6aItems.concat(items);

            this.isShowMsg = !this.ks6aItems.length ? true : false;
          },
          error: () => this.isShowMsg = true,
        });
      },
    );
  }

  getExecutionDateLabel (execution: Execution): string {
    const curLang = this.translocoService.getActiveLang();
    return format(new Date(execution.periodDate), 'MMM yyyy', {
      locale: curLang === 'ru' ? ru : enGB,
    });
  }

}
