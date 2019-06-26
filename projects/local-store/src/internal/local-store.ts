import { BehaviorSubject, noop, Observable, Subject, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Action, isAction, NoAction } from './action';
import { ActionDef } from './action-def';
import { ActionHandler, StateReducer } from './action-handler';

export class LocalStore<S> extends Observable<S> {
  private readonly state: BehaviorSubject<S>;
  private readonly actions: Subject<Action>;
  private readonly subs: Subscription[] = [];

  constructor(initialState: S) {
    super();
    this.state = new BehaviorSubject<S>(initialState);
    this.actions = new Subject<Action>();

    // tslint:disable-next-line:deprecation
    this.source = this.state;
  }

  action<T = never>(actionType: string, handler: ActionHandler<S, T>): ActionDef<T> {
    const actionDef = new ActionDef<T>(actionType, action => this.dispatch(action));

    const sub = this.actions
      .pipe(
        filter(action => action.type === actionDef.type),
        map(action => action.payload),
        handler.state
          ? tap(payload => this.updateState(payload, handler.state))
          : tap(noop),
        handler.action
          ? handler.action
          : tap(noop),
      )
      .subscribe(handler.action
        ? action => this.dispatchIfAction(action)
        : noop);

    this.subs.push(sub);

    return actionDef;
  }

  dispatch(action: Action) {
    this.actions.next(action);
  }

  dispose() {
    this.state.complete();
    this.actions.complete();

    this.subs.forEach(sub => sub.unsubscribe());
  }

  private updateState<P>(payload: P, reduce: StateReducer<S, P>) {
    const newState = reduce(this.state.getValue(), payload);
    this.state.next(newState);
  }

  private dispatchIfAction(action: Action | NoAction) {
    if (isAction(action)) {
      this.dispatch(action);
    }
  }
}
