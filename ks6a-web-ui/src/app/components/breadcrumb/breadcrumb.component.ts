import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { BreadcrumbStore } from '@cmp/breadcrumb/breadcrumb.store';
import { BreadcrumbState, BreadcrumbItem } from '@cmp/breadcrumb/breadcrumcb.type';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  inputs: ['link', 'label', 'level'],
  host: { class: 'flex' },
})
export class BreadcrumbComponent implements OnChanges {
  crumbs$ = this.breadcrumbStore.crumbs$;
  public link!: string;
  public label!: string;
  public level!: number;
  constructor (
    public breadcrumbStore: BreadcrumbStore,
  ) {}

  ngOnChanges (changes: SimpleChanges) {
    const crumb = {
      link: this.link,
      label: changes['label'].currentValue,
      level: this.level,
    };
    this.addCrumb(crumb);
  }

  addCrumb (crumb: BreadcrumbItem): void {
    const crumbState: BreadcrumbItem[] = [];
    this.breadcrumbStore.state$.forEach((i: BreadcrumbState) => {
      if (i.crumbs) {
        i.crumbs.forEach((c: BreadcrumbItem) => {
          if (c.level < crumb.level) crumbState.push(c)
        });
      }
    });
    this.breadcrumbStore.patchState(() => ({
      crumbs: [...crumbState, crumb],
    }));
  }

}
