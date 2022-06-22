import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { format } from 'date-fns';
import { enGB, ru } from 'date-fns/locale';

import { Ks6aItemService } from '@page/ks6a-item/ks6a-item.service';
import { Ks6aItem, Execution, Ks6aPeriods, Remainder } from '@app/dto';

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
  public isShowModal: boolean = false;
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
            this.ks6aItems = ks6aItems;
            this.isShowMsg = !this.ks6aItems.length ? true : false;
          },
          error: () => this.isShowMsg = true,
        });
      },
    );
  }

  getExecutionDateLabel (ks6aPeriod: Ks6aPeriods, formatDate = 'MMM yyyy'): string {
    const curLang = this.translocoService.getActiveLang();
    return format(new Date(ks6aPeriod.periodDate), formatDate, {
      locale: curLang === 'ru' ? ru : enGB,
    });
  }

  getExutionPeriodVolume (ks6aPeriodDate: Date, ks6aItem: Ks6aItem): number | undefined {
    return ks6aItem.executions.find((i: Execution) => i.periodDate === ks6aPeriodDate)?.volume;
  }

  getRemainderPeriodVolume (ks6aPeriodDate: Date, ks6aItem: Ks6aItem): number | undefined {
    return ks6aItem.remainders.find((i: Remainder) => i.periodDate === ks6aPeriodDate)?.volume;
  }

  getContractorExutionPeriodVolume (ks6aPeriodDate: Date, executions: Execution[]): number | undefined {
    return executions.find((e) => e.periodDate === ks6aPeriodDate)?.volume;
  }

  addPeriod (ks6aPeriod: Ks6aPeriods): void {
    this.ks6aItemService.addPeriod(ks6aPeriod);
  }

}
