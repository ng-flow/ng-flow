import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type TypedForm<T> = {
  [P in keyof T]: T[P] extends Array<any>
    ? FormArray | FormControl
    : T[P] extends object
      ? FormGroup | FormControl
      : FormControl;
}

export function keyOf<T>(key: keyof T): keyof T {
  return key;
}
