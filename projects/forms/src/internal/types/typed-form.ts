import { AbstractControl } from '@angular/forms';

export type TypedForm<T> = {
  [K in keyof T]: AbstractControl
}

export function keyOf<T>(key: keyof T): keyof T {
  return key;
}
