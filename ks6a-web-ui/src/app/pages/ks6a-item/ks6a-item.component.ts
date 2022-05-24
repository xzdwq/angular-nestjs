import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { format } from 'date-fns';
import { enGB, ru } from 'date-fns/locale';

import { Ks6aItemService } from '@page/ks6a-item/ks6a-item.service';
import { Ks6aItem, Period } from '@app/dto';

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
  public period: Period[] = [];
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
            this.ks6aItems = ks6aItems.ks6aItems;
            this.period = ks6aItems.periods;

            this.isShowMsg = !this.ks6aItems.length ? true : false;
          },
          error: () => this.isShowMsg = true,
        });
      },
    );
  }

  getExecutionDateLabel (period: Period): string {
    const curLang = this.translocoService.getActiveLang();
    return format(new Date(period.period), 'MMM yyyy', {
      locale: curLang === 'ru' ? ru : enGB,
    });
  }

}
