import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

export function enableAll(control: AbstractControl, opts?: { onlySelf?: boolean; emitEvent?: boolean; }): void {
  if (control.disabled) {
    if (control instanceof FormGroup) {
      Object.keys(control.controls)
        .filter(name => control.controls[name].disabled)
        .forEach(name => {
          enableAll(control.controls[name]);
        });
    } else if (control instanceof FormArray) {
      control.controls
        .filter(c => c.disabled)
        .forEach(c => {
          enableAll(c);
        });
    } else {
      control.enable(opts);
    }
  }
}
