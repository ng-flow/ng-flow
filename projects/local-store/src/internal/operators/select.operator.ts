import { OperatorFunction, pipe } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export function select<S, R>(project: (value: S) => R): OperatorFunction<S, R> {
  return pipe(
    map(project),
    distinctUntilChanged(),
  );
}
