import { OperatorFunction } from 'rxjs';
import { Action, NoAction } from './action';

export type StateReducer<S, P> = (state: S, action: Action<P>) => S;

export type ActionDescriptor<P> = OperatorFunction<Action<P>, Action | NoAction>;

export interface ActionHandler<S, P> {
  state?: StateReducer<S, P>,
  action?: ActionDescriptor<P>;
}
