import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Data, Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';

import { Breadcrumb } from '@cmp/breadcrumb/breadcrumcb.type';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);
  readonly breadcrumbs$ = this._breadcrumbs$.asObservable();
  private currentLang!: string;
  constructor (
    private router: Router,
    private translocoService: TranslocoService,
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const { root, breadcrumbs } = this.getDefaultRouteData();
        this.addBreadcrumb(root, [], breadcrumbs);
        this._breadcrumbs$.next(breadcrumbs);
      }
    });
    this.translocoService.langChanges$.subscribe(() => {
      this.currentLang = this.translocoService.getActiveLang();
      const { root, breadcrumbs } = this.getDefaultRouteData();
      this.addBreadcrumb(root, [], breadcrumbs);
      this._breadcrumbs$.next(breadcrumbs);
    });
  }

  private addBreadcrumb (route: any, parentUrl: string[], breadcrumbs: Breadcrumb[]) {
    if (route) {
      const routeUrl = parentUrl.concat(route.url.map((url: { path: string }) => url.path));

      if (route.data['breadcrumb']) {
        const breadcrumb = {
          label: this.getLabel(route.data),
          url: '/' + routeUrl.join('/'),
        };
        if (breadcrumb.label && breadcrumb.label !== 'undefined')
          breadcrumbs.push(breadcrumb);
      }

      this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
    }
  }

  private getLabel (data: Data) {
    return typeof data['breadcrumb'] === 'function'
      ? (data['langProp'] ? data['breadcrumb'](data)?.[data['langProp'][this.currentLang]] : data['breadcrumb'](data))
      : data['breadcrumb'];
  }

  private getDefaultRouteData (): { root: ActivatedRouteSnapshot, breadcrumbs: [] } {
    return {
      root: this.router.routerState.snapshot.root,
      breadcrumbs: [],
    }
  }
}
