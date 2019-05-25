import { AbstractControl } from '@angular/forms';
import { merge, Observable } from 'rxjs';
import { distinctUntilChanged, map, skipWhile } from 'rxjs/operators';
import { FormObserverStateEvent } from './form-observer-state-event';
import { propertyChanges } from './property-changes';

export function pristineChanges$(control: AbstractControl): Observable<boolean> {
  return propertyChanges(control, 'pristine').pipe(
    map(() => control.pristine),
    skipWhile(initialValue(control.pristine)),
    distinctUntilChanged(),
  );
}

export function dirtyChanges$(control: AbstractControl): Observable<boolean> {
  return pristineChanges$(control).pipe(map(pristine => !pristine));
}

export function touchedChanges$(control: AbstractControl): Observable<boolean> {
  return propertyChanges(control, 'touched').pipe(
    map(() => control.touched),
    skipWhile(initialValue(control.touched)),
    distinctUntilChanged(),
  );
}

export function untouchedChanges$(control: AbstractControl): Observable<boolean> {
  return touchedChanges$(control).pipe(map(touched => !touched));
}

export function statusChanges$(control: AbstractControl): Observable<string> {
  return propertyChanges(control, 'status').pipe(
    map(() => control.status),
    skipWhile(initialValue(control.status)),
    distinctUntilChanged(),
  );
}

export function enabledChanges$(control: AbstractControl): Observable<boolean> {
  return statusChanges$(control).pipe(
    map(() => control.enabled),
    skipWhile(initialValue(control.enabled)),
    distinctUntilChanged(),
  );
}

export function disabledChanges$(control: AbstractControl): Observable<boolean> {
  return enabledChanges$(control).pipe(map(enabled => !enabled));
}

export function pendingChanges$(control: AbstractControl): Observable<boolean> {
  return statusChanges$(control).pipe(
    map(() => control.pending),
    skipWhile(initialValue(control.pending)),
    distinctUntilChanged(),
  );
}

export function validChanges$(control: AbstractControl): Observable<boolean> {
  return statusChanges$(control).pipe(
    map(() => control.valid),
    skipWhile(initialValue(control.valid)),
    distinctUntilChanged(),
  );
}

export function invalidChanges$(control: AbstractControl): Observable<boolean> {
  return statusChanges$(control).pipe(
    map(() => control.invalid),
    skipWhile(initialValue(control.invalid)),
    distinctUntilChanged(),
  );
}

export function valueChanges$(control: AbstractControl): Observable<any> {
  return propertyChanges(control, 'value').pipe(
    map(() => control.value),
    skipWhile(initialValue(control.value)),
    distinctUntilChanged(),
  );
}

export function stateChanges$(control: AbstractControl): Observable<FormObserverStateEvent> {
  return merge(
    pristineChanges$(control),
    touchedChanges$(control),
    statusChanges$(control),
    valueChanges$(control),
  ).pipe(map(() => ({
    pristine: control.pristine,
    dirty: control.dirty,
    touched: control.touched,
    untouched: control.untouched,
    status: control.status,
    enabled: control.enabled,
    disabled: control.disabled,
    pending: control.pending,
    valid: control.valid,
    invalid: control.invalid,
    value: control.value,
  })));
}


// tslint:disable-next-line:no-shadowed-variable
function initialValue<T>(initialValue: T): (v: T) => boolean {
  return value => value === initialValue;
}
