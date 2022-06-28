import { HttpClient } from '@angular/common/http';
import {
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule,
} from '@ngneat/transloco';
import { Injectable, NgModule } from '@angular/core';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor (private http: HttpClient) {}

  public getTranslation (lang: string): Observable<Translation> {
    return this.http.get<Translation>(`${environment.baseUrl}/assets/i18n/${lang}.json`);
  }
}

let lang = 'ru';
!localStorage.getItem('lang')
  ? localStorage.setItem('lang', `${lang}`)
  : lang = localStorage.getItem('lang') || lang;

@NgModule({
  exports: [
    TranslocoModule,
  ],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: [
          { id: 'ru', label: 'Русский' },
          { id: 'en', label: 'English' },
        ],
        defaultLang: lang,
        reRenderOnLangChange: true,
        missingHandler: {
          logMissingKey: false,
        },
        fallbackLang: lang,
        prodMode: environment.production,
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
  ],
})
export class TranslocoRootModule {}
