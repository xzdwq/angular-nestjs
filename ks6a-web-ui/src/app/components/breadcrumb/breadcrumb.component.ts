import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  host: { class: 'flex' },
})
export class BreadcrumbComponent implements OnInit {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit (): void {
  }

}
