import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-hbf-content',
  templateUrl: './hbf-content.component.html',
  inputs: ['resizeTable', 'columnFixed'],
  host: { class: 'h-full flex flex-col' },
})
export class HbfContentComponent implements OnInit {
  public resizeTable: boolean = false;
  public columnFixed: boolean = false;

  @ContentChild('headerTpl') headerTpl!: TemplateRef<any>;
  @ContentChild('bodyTpl') bodyTpl!: TemplateRef<any>;
  @ContentChild('footerTpl') footerTpl!: TemplateRef<any>;
  constructor () {}

  ngOnInit (): void {
  }

}
