
import { NgModule, LOCALE_ID } from '@angular/core';
import { NZ_I18N, en_US, ru_RU, NZ_DATE_LOCALE } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { enUS, ru } from 'date-fns/locale';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@NgModule({
  exports: [
    NzIconModule,
    NzDatePickerModule,
    NzInputModule,
    NzDropDownModule,
  ],
  providers: [
    {
      provide: NZ_I18N,
      useFactory: (localId: string) => {
        switch (localId) {
          case 'en':
            return en_US;
          case 'ru':
            return ru_RU;
          default:
            return en_US;
        }
      },
      deps: [LOCALE_ID],
    },
    {
      provide: NZ_DATE_LOCALE,
      useFactory: (localId: string) => {
        switch (localId) {
          case 'en':
            return enUS;
          case 'ru':
            return ru;
          default:
            return enUS;
        }
      },
      deps: [LOCALE_ID],
    },
  ],
})
export class NgZorroAntdModule {}
