import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BreadcrumbService } from '@cmp/breadcrumb/breadcrumb.service';
import { Breadcrumb } from '@cmp/breadcrumb/breadcrumcb.type';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  host: { class: 'flex' },
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs$: Observable<Breadcrumb[]>;

  constructor (
    private readonly breadcrumbService: BreadcrumbService,
  ) {
    this.breadcrumbs$ = breadcrumbService.breadcrumbs$;
  }

  ngOnInit () {
  }

}
