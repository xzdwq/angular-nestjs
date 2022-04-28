import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-hbf-content',
  templateUrl: './hbf-content.component.html',
  host: { class: 'h-full flex flex-col' },
})
export class HbfContentComponent implements OnInit {
  @ContentChild('headerTpl') headerTpl!: TemplateRef<any>;
  @ContentChild('bodyTpl') bodyTpl!: TemplateRef<any>;
  @ContentChild('footerTpl') footerTpl!: TemplateRef<any>;
  constructor () {}

  ngOnInit (): void {
  }

}
