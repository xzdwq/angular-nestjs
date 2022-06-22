import { Component, OnInit } from '@angular/core';
import { TranslocoService, AvailableLangs, LangDefinition } from '@ngneat/transloco';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
})
export class ToolBarComponent implements OnInit {
  currentLang!: string;
  constructor (
    private translocoService: TranslocoService,
    private router: Router,
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

  goHome (): void {
    this.router.navigate(['project/1']);
  }

  goSettings (): void {
    this.router.navigate(['settings']);
  }

}
