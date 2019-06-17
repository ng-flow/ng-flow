import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { localStoreService } from '../internal/local-store-service.provider';
import { HostData } from './host-data';
import { HostService } from './host.service';

@Component({
  selector: 'lib-host',
  template: `
    <ul>
      <li id="item-1" (click)="loadItem(1)">Item 1</li>
      <li id="item-2" (click)="loadItem(2)">Item 2</li>
    </ul>`,
  providers: [
    localStoreService(HostService),
  ],
})
export class HostComponent implements OnInit {

  constructor(private hostService: HostService) { }

  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
  error$: Observable<HttpErrorResponse | null>;
  data$: Observable<HostData>;

  ngOnInit() {
    this.loaded$ = this.hostService.loaded$;
    this.loading$ = this.hostService.loading$;
    this.error$ = this.hostService.error$;
    this.data$ = this.hostService.data$;
  }

  loadItem(id: number) {
    this.hostService.load(id);
  }
}
