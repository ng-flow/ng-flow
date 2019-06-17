import { Observable } from 'rxjs';

export interface TestSubscription<T> {
  readonly values: T[];
  readonly error: () => any | undefined;
  readonly completed: () => boolean;
}

export function subscription<T>(observable: Observable<T>): TestSubscription<T> {
  const values = [];
  let completed = false;
  let error;

  observable.subscribe(
    v => values.push(v),
    e => error = e,
    () => completed = true,
  );

  return {
    values,
    error: () => error,
    completed: () => completed,
  };
}
