import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { distinctUntilChanged, tap } from 'rxjs';

import { Ks6aItemService } from '@page/ks6a-item/ks6a-item.service';
import { DateManipulation } from '@app/utils/date-manipulation.util';
import { Ks6aItem, Execution, Ks6aPeriods, Remainder, AddKs6aPeriod, UpdateKs6aPeriod } from '@app/dto';

@Component({
  selector: 'app-ks6a-item',
  templateUrl: './ks6a-item.component.html',
  host: { class: 'h-full flex flex-col' },
})
export class Ks6aItemComponent implements OnInit {
  public projectIdSelect!: number;
  public estimateIdSelect!: number;
  public ks6aItems: Ks6aItem[] = [];
  private initialPeriod: Ks6aPeriods[] = [];
  public isShowMsg: boolean = false;
  public executions: Execution[] = [];
  public isShowModal: boolean = false;
  public isOnlyBalance: boolean = false;
  public monthFormat: string = 'MMMM yyyy';

  // public disabledDate = (currentDate: Date): boolean => {
  //   const maxDate = new Date(this.ks6aItems[0].ks6a.ks6aPeriods.reduce((a, b) => a > b ? a : b).periodDate);
  //   if (currentDate <= maxDate) return true;
  //   return false;
  // }

  constructor (
    private route: ActivatedRoute,
    public ks6aItemService: Ks6aItemService,
    private translocoService: TranslocoService,
    private dateManipulation: DateManipulation,
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
              this.initialPeriod =
                ks6aItems.length
                ? JSON.parse(JSON.stringify(this.ks6aItems[0].ks6a.ks6aPeriods))
                : [];

              this.isShowMsg = !this.ks6aItems.length ? true : false;
            },
            error: () => this.isShowMsg = true,
          });
      },
    );

    // Подписываемся на изменения языка приложения
    this.translocoService.langChanges$
      .pipe(
        distinctUntilChanged(),
        tap(() => {
          if (this.ks6aItems.length) {
            this.ks6aItems[0].ks6a.ks6aPeriods.forEach((i: Ks6aPeriods) => {
              i.periodDate = new Date(this.dateManipulation.setLangFormatDate(new Date(i.periodDate), this.monthFormat));
            });
          }
        }),
      )
      .subscribe();
  }

  onChangeKs6aPeriod (selectedDate: Date, index: number): void {
    const selectedMonth = selectedDate.getMonth(),
      selectedYear = selectedDate.getFullYear(),
      beforeMonth = new Date(this.initialPeriod[index].periodDate).getMonth(),
      beforeYear = new Date(this.initialPeriod[index].periodDate).getFullYear();

    if (`${selectedMonth} ${selectedYear}` !== `${beforeMonth} ${beforeYear}`) {
      const updateParams: UpdateKs6aPeriod = {
        ks6aId: this.ks6aItems[0].ks6a.id,
        estimateId: this.estimateIdSelect,
        ks6aPeriodId: this.ks6aItems[0].ks6a.ks6aPeriods[index].id,
        newPeriod: selectedDate,
      }
      this.ks6aItemService.updateKs6aPeriod(updateParams).subscribe();

      this.initialPeriod[index].periodDate = this.ks6aItems[0].ks6a.ks6aPeriods[index].periodDate;
    }
  }

  getExecutionDateLabel (ks6aPeriod: Ks6aPeriods, formatDate = this.monthFormat): string {
    return this.dateManipulation.setLangFormatDate(ks6aPeriod.periodDate, formatDate);
  }

  getExutionPeriodVolume (ks6aPeriodDate: Date, ks6aItem: Ks6aItem): number | undefined {
    return ks6aItem.executions.find((i: Execution) => {
      return this.dateManipulation.setLangFormatDate(i.periodDate) === this.dateManipulation.setLangFormatDate(ks6aPeriodDate);
    })?.volume;
  }

  getRemainderPeriodVolume (ks6aPeriodDate: Date, ks6aItem: Ks6aItem): number | undefined {
    return ks6aItem.remainders.find((i: Remainder) => i.periodDate === ks6aPeriodDate)?.volume;
  }

  getContractorExutionPeriodVolume (ks6aPeriodDate: Date, executions: Execution[]): number | string {
    return executions.find((e) => {
      return this.dateManipulation.setLangFormatDate(e.periodDate) === this.dateManipulation.setLangFormatDate(ks6aPeriodDate);
    })?.volume || '';
  }

  addKs6aPeriod (): void {
    const addParams: AddKs6aPeriod = {
      ks6aId: this.ks6aItems[0].ks6a.id,
      estimateId: this.estimateIdSelect,
    }
    this.ks6aItemService.addKs6aPeriod(addParams)
      .subscribe({
        next: (ks6aItems) => {
          this.ks6aItems = ks6aItems;

          this.isShowMsg = !this.ks6aItems.length ? true : false;
        },
        error: () => this.isShowMsg = true,
      });
  }

  deletePeriod (ks6aPeriodId: number): void {
    this.ks6aItemService.deletePeriod(ks6aPeriodId)
    .subscribe({
      next: () => {
        const indexPeriod = this.ks6aItems[0].ks6a.ks6aPeriods.findIndex((i) => i.id === ks6aPeriodId);
        this.ks6aItems[0].ks6a.ks6aPeriods.splice(indexPeriod, 1);

        this.isShowMsg = !this.ks6aItems.length ? true : false;
      },
      error: () => this.isShowMsg = true,
    });
  }

}
