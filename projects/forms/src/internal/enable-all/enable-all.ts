import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

export function enableAll<T>(control: AbstractControl, opt?: { emitEvents: boolean }): void {
  if (control.disabled) {
    if (control instanceof FormGroup) {
      Object.keys(control.controls)
        .filter(name => control.controls[name].disabled)
        .forEach(name => {
          enableAll(control.controls[name]);
        });
    } else if (control instanceof FormArray) {
      control.controls
        .filter(control => control.disabled)
        .forEach(control => {
          enableAll(control);
        });
    } else {
      control.enable({emitEvent: opt.emitEvents});
    }
  }
}
