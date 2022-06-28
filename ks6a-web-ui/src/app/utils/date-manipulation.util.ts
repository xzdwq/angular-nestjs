import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { format } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';

@Injectable({
  providedIn: 'root',
})
export class DateManipulation {
  public monthFormat: string = 'MMMM yyyy';

  constructor (
    private translocoService: TranslocoService,
  ) {}

  setLangFormatDate (datePart: string | Date, formatDate = this.monthFormat): string {
    const curLang = this.translocoService.getActiveLang();
    return format(new Date(datePart), formatDate, {
      locale: curLang === 'ru' ? ru : enUS,
    });
  }

}
