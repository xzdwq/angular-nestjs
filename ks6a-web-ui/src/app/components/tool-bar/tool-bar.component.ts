import { Component, OnInit } from '@angular/core';
import { TranslocoService, AvailableLangs, LangDefinition } from '@ngneat/transloco';
import { Router } from '@angular/router';
import { en_US, NzI18nService, ru_RU } from 'ng-zorro-antd/i18n';
import { enUS, ru } from 'date-fns/locale';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
})
export class ToolBarComponent implements OnInit {
  currentLang!: string;
  constructor (
    private translocoService: TranslocoService,
    private router: Router,
    private ngZorroI18n: NzI18nService,
  ) {}

  ngOnInit (): void {
    this.currentLang = this.translocoService.getActiveLang();
    this.ngZorroSetLang();
  }

  switchLang (lang: LangDefinition): void {
    this.translocoService.setActiveLang(lang.id);
    this.currentLang = lang.id;
    this.ngZorroSetLang();
    localStorage.setItem('lang', `${lang.id}`);
  }

  getLangs (): AvailableLangs {
    return this.translocoService.getAvailableLangs();
  }

  goHome (): void {
    this.router.navigate(['project/1']);
  }

  goSettings (): void {
    this.router.navigate(['settings']);
  }

  ngZorroSetLang (): void {
    this.ngZorroI18n.setLocale(this.currentLang === 'ru' ? ru_RU : en_US);
    this.ngZorroI18n.setDateLocale(this.currentLang === 'ru' ? ru : enUS);
  }

}
