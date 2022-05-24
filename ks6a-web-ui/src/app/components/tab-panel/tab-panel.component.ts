import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tab-panel',
  templateUrl: './tab-panel.component.html',
  inputs: ['items', 'tabIndex'],
})
export class TabPanelComponent implements OnInit {
  @Output()
  tabClickEvent: EventEmitter<number> = new EventEmitter<number>();
  public items: any;
  public tabIndex: number = 0;
  constructor () {}

  ngOnInit (): void {
  }

  tabClick (tabIndex: number): void {
    this.tabIndex = tabIndex;
    this.tabClickEvent.emit(tabIndex);
  }

}
