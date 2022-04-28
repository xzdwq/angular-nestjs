import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-route-go',
  templateUrl: './route-go.component.html',
  inputs: ['iconName', 'labelLang'],
})
export class RouteGoComponent implements OnInit {
  public iconName: string = 'chevron_left';
  public labelLang: string = 'back';
  constructor (
    private router: Router,
  ) {}

  ngOnInit (): void {
  }

  routeGo (path: string): void {
    this.router.navigate([`${path}`]);
  }

}
