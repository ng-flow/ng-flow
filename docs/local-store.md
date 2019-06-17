# LocalState

This package allows to create local component state, which lives as long as component. It also encourage you to create
[push based service](#push-based-service), which is responsible for managing that state.

It concept is based on [NgRx](https://github.com/ngrx/platform) (but does not require it).
It is also simplified as I tried to be able to keep all logic in single file (in NgRx you often create 3-4 files per state).



# Installation
`npm i @ng-bucket/local-store`

Peer dependencies:
 * `@angular/core` >= 6
 * `rxjs` >= 6



# Push based service
On ng-conf 2019, Thomas Burleson defined `push based service` in comparison to `pull based service`. 
He explained it on his presentation [Before NgRx: Superpowers with RxJS + Facades](https://www.youtube.com/watch?v=h-F5uYM69a4&list=PLOETEcp3DkCpimylVKTDe968yNmNIajlR&index=53)
which I definitely recommend you to watch :smile:

In brief, in `push based service` architecture you create a service which expose `Observables` (state changes) and methods which, under the hood, change state.
As result you *indirectly* changing state and listening for that changes. 



# Table of contents
* [Separation of concern](#separation-of-concern)
* [Folder structure](#folder-structure)
* [Component](#component)
  * [Providers](#providers)
  * [Reacting to state changes](#reacting-to-state-changes)
  * [Delegating actions](#delegating-actions)
* [Service](#service)
* [Example](#example)



# Separation of concern
Separation of concern is important, because "use of state" is not equal to "managing state". Therefore the two should be splitted.  
This is why you should always create a Component (which use state) and Service (which manage that state).



# Folder structure
Service and Component should be next each other:
```
 +- your-component
 |  +- your-component.component.html
 |  +- your-component.component.scss
 |  +- your-component.component.ts
 |  +- your-component.service.ts      <- `Service` responsible for state management 
```


# Component
Component listen for state changes and react to it, ex. shows loading indicator when request is pending and hides it 
when response returns. Component also calls Service methods which triggers state changes, ex. calling `service.load(1234)`, 
triggers load request and changing `state.loading` property to `true`, when response returns`state.loading` is set to 
`false` and `state.data` is set to what response returns.



## Providers
State has to be bound to component lifecycle, by that I mean it has to be created when component is created and destroyed 
when component is destroyed. But "creating" and "destroying" is part of managing state which has to be done is Service. 
Therefore Service itself has to be bound to Component lifecycle. To achieve it Component has to provide Service.

To provide Service use `localStoreService(Type)` utility function. It has single argument which has to be you Service.
Under the hood this function also provides `LocalStoreFactory` which your Service will inject to create `LocalStore`.

```typescript
import { localStoreService } from '@ng-bucket/local-store'
import { YourService } from './your-component.service'

@Component({
  // ...
  providers: [localStoreService(YourService)]
})
export class YourComponent {/* ... */}
```



## Reacting to state changes
Each time state changes, Service will emit that changes throughout `Observables` properties. Component should subscribe 
to that changes, ideally by `async` pipe.

```typescript
import { YourService } from './your-component.service'

@Component({
  // ...
  template: `
  <div *ngIf="loading$ | async">Loading...</div>
  <div *ngIf="error$ | async as error">Error: {{error}}</div>
  
  <ng-container *ngIf="data$ | async as data">
    <some-component [data]="data"></some-component>
  </ng-container>
  `
})
export class YourComponent implements OnInit {
  constructor(private service: YourService) {}
  
  loading$: Observable<boolean>
  error$: Observable<HttpErrorResponse | null>
  data$: Observable<YourData>
  
  ngOnInit() {
    this.loading$ = this.service.loading$;
    this.error$ = this.service.error$;
    this.data$ = this.service.data$;
  }
}
```




## Delegating actions
State changes usually are made by user events, like clicking on a button. Those events have to be handled by a Component 
and delegated to Service method.

```typescript
import { YourService } from './your-component.service'

@Component({
  // ...
  template: '<button type="button" (click)="handleClick()">Refresh</div>'
})
export class YourComponent {
  constructor(private service: YourService) {}
  
  //...
  
  handleClick() {
    this.service.refresh();
  }
}
```



# Service
*Managing state* is what Service should be doing.



# Example
Lets assume we have `EmployeeListComponent` which displays list of employees by name and by clicking on particular list item
we want to show employee details. 

For performance reasons, to render a list of employees we use `EmployeeItem` object which is "light" version of `Employee` object. 
Therefore `Employee` object is loaded when user clicks on a particular list item.

```typescript
export interface EmployeeItem {
  id: number;
  fistName: string;
  lastName: string;
}

export interface Employee {
  id: number;
  fistName: string;
  lastName: string;
  
  // many other fields...
}
```

`EmployeeListComponent` will look like that:

```typescript
import { localStoreService } from '@ng-bucket/local-store'
import { EmployeeListService } from './employee-list.sercive'

@Component({
  //...
  template: `
  <ul>
    <li *ngFor="let item of items" (click)="load(item.id)>
      {{item.firstName}} {{item.lastName}}
    </li>
  </ul>
  
  <section>
    <div *ngIf="loading$ | async">Loading...</div>
    <div *ngIf="error$ | async as error">Error: {{error}}</div>
    
    <ng-container *ngIf="employee$ | async as employee">
      <app-employee-details [employee]="employee"></app-employee-details>
    </ng-container>
  </section>`,
  providers: [localStoreService(EmployeeListService)]
})
export class EmployeeListComponent implements OnInit {
  @Input()
  items: EmployeeItem[];
  
  constructor(private service: EmployeeListService) {}
  
  loading$: Observable<boolean>; // request is pending
  error$: Observable<HttpErrorResponse | null>; // response return error
  employee$: Observable<Employee>; // loaded Employee
  
  ngOnInit() {
    this.loading$ = this.service.loading$;
    this.error$ = this.service.error$;
    this.employee$ = this.service.employee$;
  }
  
  load(item: EmployeeItem) {
    this.service.load(item.id);
  }
 }
```

As you can see, component code is simple. All it does is assigning streams in `ngOnInit` and delegating `load` request to service. 
Everything else will happens in service:
 * emitting `true` on `loading$`
 * triggering http request
 * when response return:
   * emitting `false` on `loading$`
   * emitting `Employee` object on `employee$`, if response succeed
   * emitting error object on `error$`, if response failed














# TODO: remove!

### Separation of concern

`EmployeeService` injects `LocalStateFactory` which is used to create `LocalState` and stored in private variable.

```typescript
// employee.service.ts

import { Injectable } from '@angular/core'
import { LocalStoreFactory } from '@ng-bucket/local-store'

interface EmployeeState { /* state fields */ }

const INITIAL_STATE: EmployeeState = { /* initial state */ };

@Injectable()
export class EmployeeService {
  constructor(private localStoreFactory: LocalStoreFactory<EmployeeState>) { }

  private readonly store = this.localStoreFactory.create(INITIAL_STATE);
  
  // ...
}
```

Notice `@Injectable()` without `{providedIn: 'root'}`, this is intentional because `EmployeeService` should be provided in 
`EmployeeComponent`, aka lives as long as `EmployeeComponent`.

```typescript
// employee.component.ts

import { Component } from '@angular/core'
import { EmployeeService } from './employee.sercive'
import { localStoreService } from '@ng-bucket/local-store'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [localStoreService(EmployeeService)],
})
export class EmployeeComponent { /* some staff */ }
```

`localStoreService` is utility function which provides both `EmployeeService` and `LocalStoreFactory`. 

Usage of `providers: [localStoreService(EmployeeService)]` is equal to `providers: [LocalStoreFactory, EmployeeService]`. 
You can use what suits you best, but `localStoreService` is recommended as it hides required configuration.


### State "user"
Before you start implementing you state management, you should first consider:
 * [what you need from state?](#what-you-need-from-state)
 * [what actions you will be performing?](#what-actions-you-will-be-performing)

#### What you need from state?
So assuming `EmployeeComponent` will only be displaying `Employee` data based on `id`, you will need four `Observables`:
 * `loaded$: Observable<boolean>` - indicates if `Employee` is loaded
 * `loading$: Observable<boolean>` - indicates if request is pending
 * `error$: Observable<HttpErrorResponse | null>` - errors from backed
 * `employee$: Observable<Employee>` - actual `Employee` data 
 
```typescript
// employee.component.ts

import { Component, OnInit } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http';
import { localStoreService } from '@ng-bucket/local-store'
import { Observable } from 'rxjs'
import { EmployeeService } from './employee.sercive'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [localStoreService(EmployeeService)],
})
export class EmployeeComponent implements OnInit { 
  constructor(private service: EmployeeService) {}
  
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
  error$: Observable<HttpErrorResponse | null>;
  employee$: Observable<Employee>;
  
  ngOnInit() {
    this.loaded$ = this.service.loaded$;
    this.loading$ = this.service.loading$;
    this.error$ = this.service.error$;
    this.employee$ = this.service.employee$;
  }
  
  // ...
 }
```

Now we know fields (state slice) which `EmployeeService` should expose.

#### What actions you will be performing?
As `EmployeeComponent` will be loading `Employee` data by id, it needs one function:
 * `load(id: number)` 


```typescript
// employee.component.ts

import { Component, OnInit } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http';
import { localStoreService } from '@ng-bucket/local-store'
import { Observable } from 'rxjs'
import { EmployeeService } from './employee.sercive'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [localStoreService(EmployeeService)],
})
export class EmployeeComponent implements OnInit { 
  constructor(private service: EmployeeService) {}
  
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
  error$: Observable<HttpErrorResponse | null>;
  employee$: Observable<Employee>;
  
  ngOnInit() {
    this.loaded$ = this.service.loaded$;
    this.loading$ = this.service.loading$;
    this.error$ = this.service.error$;
    this.employee$ = this.service.employee$;
  }
  
  load(id: number) {
    this.service.load(id);
  }
 }
```
