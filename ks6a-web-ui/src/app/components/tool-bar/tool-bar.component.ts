import { Component, OnInit } from '@angular/core';
import { TranslocoService, AvailableLangs, LangDefinition } from '@ngneat/transloco';

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

  switchLang (lang: LangDefinition): void {
    this.translocoService.setActiveLang(lang.id);
    this.currentLang = lang.id;
    localStorage.setItem('lang', `${lang.id}`);
  }

  getLangs (): AvailableLangs {
    return this.translocoService.getAvailableLangs();
  }

}
