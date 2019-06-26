import { OperatorFunction } from 'rxjs';
import { Action, NoAction } from './action';

export type StateReducer<S, P> = (state: S, action: P) => S;

export type SideEffect<P> = OperatorFunction<P, Action | NoAction>;

export interface ActionHandler<S, P> {
  state?: StateReducer<S, P>,
  action?: SideEffect<P>;
}
