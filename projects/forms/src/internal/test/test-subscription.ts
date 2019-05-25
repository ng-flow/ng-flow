import { Observable } from 'rxjs';

export interface TestSubscription<T> {
  readonly values: T[];
}

export function subscription<T>(observable: Observable<T>): TestSubscription<T> {
  const values = [];
  observable.subscribe(v => values.push(v));

  return {
    values,
  };
}
