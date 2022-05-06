import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';

import { BreadcrumbState, BreadcrumbItem } from '@cmp/breadcrumb/breadcrumcb.type';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbStore extends ComponentStore<BreadcrumbState> {
  readonly crumbs$: Observable<BreadcrumbItem[]> = this.select(state => state.crumbs);

  constructor () {
    super({
      crumbs: [],
    });
  }
}
