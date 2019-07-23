# @ng-bucket/local-store

* [Installation](#installation)
* [What is Store?](#what-is-store)
* [Motivation](#motivation)
* [Separation of concern](#separation-of-concern)
  * [Folder structure](#folder-structure)
* [Service](#service)
  * [Providing](#providing)
  * [LocalStoreFactory](#localstorefactory)
  * [LocalStore](#localstore)
  * [State slices](#state-slices)
  * [Actions](#actions)
  * [Dispatching action](#dispatching-action)
* [Component](#component)
  * [Listening for changes](#listening-for-changes)
  * [Invoking methods](#invoking-methods)
* [API](#api)
* [Example](#example)



# Installation
`npm i @ng-bucket/local-store`

Peer dependencies:
 * `@angular/core` >= 6
 * `rxjs` >= 6



# What is Store?

_Store_ has 2 responsibles:
* it holds _State_ object
* and creates and run actions

and _State_ has 3 principles:
 * is single source of truth
 > Data are stored in _State_ (ex. data loaded from backend) instead of in _Component_
 
 * is read-only
 > Changes are made by creating new _State_ (from old one) with new values
 
 * changes are made through actions
 > _State_ cannot be changed directly



# Motivation
_State_ is also a global object, which is bad if you data has sense as long as your Component lives. In that case when Component is destroyed some _State_ data has to be cleared and you have do it :disappointed:

This is way `@ng-bucket/local-store` was created. Instead of creating a global _State_, it creates _LocalState_ which is also automatically destroyed when Component is destroyed.



# Separation of concern
Notice that "use of _State_" is not equal to "managing _State_". Therefore the two should be seperated. 

 * "use of _State_" is for Component, it will listen to _State_ changes, and for ex. show / hide elements accordingly
 * "managing _State_" is for Service, it will create _State_ and handle _Actions_

## Folder structure
Service and Component should be next each other:
```
 +- your-component
 |  +- your-component.component.html
 |  +- your-component.component.scss
 |  +- your-component.component.ts
 |  +- your-component.service.ts      <- `Service` responsible for state management 
```


# Service
As said above Service is responsible for managing _State_, it means it has to:
* create & update _State_
* handle _Actions_

## Providing
Service has to be __provided in Component__. This autmatyclly creates and destroys Service when Component is created / destroyed and thanks to it _LocalStore_ can be disposed. But that not all, providing Service in Component means that each Component will have its own private Service. This is crucial because each Component must have its own _LocalStore_.

To provide Service, use `localStoreService()` utility function. It has one argument which is type of your Service.

```typescript
import { localStoreService } from '@ng-bucket/local-store'

@Component({
  providers: [localStoreService(YourService)]
})
export class YourComponent {/* ... */}
```


## LocalStoreFactory
_LocalStoreFactory_ is class which is provided along side with your Service when using `localStoreService()` utility function and your Service has to inject it. _LocalStoreFactory<T>_ is generic class and as its type has to be an interface which describes your state. It enables type-safety and IDE autocompletion.

_LocalStoreFactory_ creates _LocalStore_ by calling its `create(initialState: T)` method. This method expect one argument which is initial state.

```typescript
import { LocalStoreFactory } from '@ng-bucket/local-store'

interface YourState {
  value1: string
  value2: number
  value3: boolean
}

const INITIAL_STATE: YourState = {
  value1: 'SOME_INITIAL_VALUE'
  value2: 100
  value3: true
};

@Injectable()
export class YourService {
  constructor(private localStoreFactory: LocalStoreFactory<YourState>) { }

  private readonly store = this.localStoreFactory.create(INITIAL_STATE);
}
```



## LocalStore



## State slices
Once state is created your service should expose it's properties through `Observables`, aka state slices. 
State itself is `Observable` so all you need to do it `pipe` it.

```typescript
import { select } from '@ng-bucket/local-store'

interface YourState {
  loading: boolean;
  error: HttpErrorResponse | null;
  data: string | null
}

const INITIAL_STATE: YourState = {
  loading: false,
  error: null,
  data: null,
};

@Injectable()
export class YourService {
  //...
  private readonly store = this.localStoreFactory.create(INITIAL_STATE);
    
  readonly loading$ = this.store.pipe(select(state => state.loading));
  readonly error$ = this.store.pipe(select(state => state.error));
  readonly data$ = this.store.pipe(select(state => state.data));
  
  //...
}
```

Notice custom `select` operator!. It is convenient way to access state properties as it memoize values and emit values only if value changed.
It is important because state has to be immutable, as a consequence each change to the state create new state object. 
Generally new state is created from old one, moving references from old to new state object. 
So if state changed, but observed state property does not, then `select` operator will not emit new value.



## Actions
Actions triggers state changes and / or are used to perform side effects, ex. http request. 

You create them by calling `action<P>()` method on you state. 
It expects 2 arguments:
 * `actionType: string` - unique string
 * `actionHandler: ActionHandler<YourState, P>` - side effects, ex. http request
and returns `ActionDef<P>` object.

`ActionDef<P>` has 2 methods:
* `create(params: P)` - creates `Action` object (use in side effect)
* `dispatch(params: P)` - dispatches actual action (use outside of side effects)

```typescript
import { ActionHandler } from '@ng-bucket/local-store'

interface YourState {
  loading: boolean;
  error: HttpErrorResponse | null;
  data: DataFromBackend
}

//...

@Injectable()
export class YourService {
  //...
  private readonly store = this.localStoreFactory.create(INITIAL_STATE);

  //Creating actions
  private readonly loadAction = this.store.action<number>('LOAD', this.handleLoad());
  private readonly loadSuccessAction = this.store.action<DataFromBackend>('LOAD_SUCCESS', this.handleLoadSuccess());
  private readonly loadFailAction = this.store.action<HttpErrorResponse>('LOAD_FAIL', this.handleLoadFail());
  
  //...
  
  //Public API
  load(id: number) {
    this.loadAction.dispatch(id);
  }
  
  //...
  
  //Action handlers
  private handleLoad(): ActionHandler<YourState, number> {
    return {
      state: state => ({
        ...state,
        loading: true,
        error: null
      }),
      action: pipe(
        switchMap(id => this.http.get<DataFromBackend>(`data/${id}`).pipe(
          map(data => this.loadSuccessAction.create(data)),
          catchError(error => of(this.loadFailAction.create(error))),
        )),
      ),
    };
  }

  private handleLoadSuccess(): ActionHandler<YourState, DataFromBackend> {
    return {
      state: (state, data) => ({
        ...state,
        loading: false,
        loaded: true,
        data,
      }),
    };
  }

  private handleLoadFail(): ActionHandler<YourState, HttpErrorResponse> {
    return {
      state: (state, error) => ({
        ...state,
        loading: false,
        loaded: true,
        error,
      }),
    };
  }
}
```



## Dispatching action



# Component
Component listen for state changes and react to it, ex. shows loading indicator when request is pending and hides it 
when response returns. Component also calls Service methods which triggers state changes, ex. calling `service.load(1234)`, 
triggers load request and changing `state.loading` property to `true`, when response returns`state.loading` is set to 
`false` and `state.data` is set to what response returns.




## Listening for changes
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




## Invoking methods
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



# API



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

