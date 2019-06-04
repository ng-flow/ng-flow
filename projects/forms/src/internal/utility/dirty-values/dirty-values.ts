import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

export function dirtyValues<T>(control: FormGroup | FormArray): T;
export function dirtyValues<T>(control: FormControl): T | undefined;
export function dirtyValues<T>(control: AbstractControl): T | T | undefined;
export function dirtyValues<T>(control: AbstractControl): T | T | undefined {
  if (control instanceof FormGroup) {
    const value = {};
    Object.keys(control.controls)
      .filter(name => control.controls[name].dirty)
      .forEach(name => {
        value[name] = dirtyValues(control.controls[name]);
      });

    return value as T;
  } else if (control instanceof FormArray) {
    const value = [];
    control.controls
      .filter(c => c.dirty)
      .forEach(c => {
        value.push(dirtyValues(c));
      });

    return value as any as T;
  } else {
    return control.dirty ? control.value : undefined;
  }
}
