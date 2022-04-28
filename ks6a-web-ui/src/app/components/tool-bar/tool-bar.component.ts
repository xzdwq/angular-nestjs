import { Component, OnInit } from '@angular/core';
import { TranslocoService, AvailableLangs } from '@ngneat/transloco';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
})
export class ToolBarComponent implements OnInit {
  currentLang!: string;
  constructor (
    private translocoService: TranslocoService,
  ) {}

  ngOnInit (): void {
    this.currentLang = this.translocoService.getActiveLang();
  }

  switchLang (lang: string): void {
    this.translocoService.setActiveLang(lang);
    this.currentLang = lang;
    localStorage.setItem('lang', `${lang}`);
  }

  getLangs (): AvailableLangs {
    return this.translocoService.getAvailableLangs();
  }

}
