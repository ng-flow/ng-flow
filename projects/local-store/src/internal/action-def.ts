import { Action } from './action';

export class ActionDef<T> {
  constructor(public readonly type: string,
              private actionDispatcher: (action: Action<T>) => void) {}

  create(): Action<never>;
  create(payload: T): Action<T>;
  create(payload?: T): Action<T> {
    return {
      type: this.type,
      payload,
    };
  }

  dispatch();
  dispatch(payload: T);
  dispatch(payload?: T) {
    this.actionDispatcher(this.create(payload));
  }
}
