import { AbstractControl, AbstractControlOptions, FormArray, FormControl, FormGroup } from '@angular/forms';

export type TypedFormGroup<T extends object> = { discriminator: 'TypedFormGroup' }

export type TypedFormArray<T> = { discriminator: 'TypedFormArray' }

export type TypedFormValue<T> = {
  [P in keyof T]: T[P] extends TypedFormGroup<infer U>
    ? TypedFormValue<U>
    : T[P] extends TypedFormArray<infer U>
      ? U[]
      : T[P]
}

//TODO: poprawić array2
// const value: TypedFormValue<FormModel> = {
//   field: '',
//   group: {
//     field: 2,
//     field2: 1,
//   },
//   array: ['1'],
//   array2: [{field: true}],
// };


export type TypedFormControlConfig<T> = {
  value: T,
  options: TypedFormControlOptions
};

export type TypedFormControlOptions = AbstractControlOptions & { disabled?: boolean };

export type TypedFormGroupConfig<T> = {
  value: TypedFormGroupControls<T>,
  options: AbstractControlOptions
};

export type TypedFormGroupControls<T> = {
  [P in keyof T]: T[P] extends TypedFormGroup<infer U>
    ? TypedFormGroupConfig<U>
    : T[P] extends TypedFormArray<infer U>
      ? TypedFormArrayConfig<U>
      : TypedFormControlConfig<T[P]>
}

export type TypedFormArrayConfig<T> = {
  value: TypedFormArrayItem<T>[],
  options: AbstractControlOptions
};

export type TypedFormArrayItem<T> = T extends TypedFormGroup<infer U>
  ? TypedFormGroupConfig<U>
  : T extends TypedFormArray<infer U>
    ? TypedFormArrayConfig<U>
    : TypedFormControlConfig<T>;

//tests
interface FormModel {
  field: string
  group: TypedFormGroup<{
    field: number
    field2: number
  }>,
  array: TypedFormArray<string>
  array2: TypedFormArray<TypedFormGroup<{
    field: boolean
  }>>
}

const controls = typedForm<FormModel>({
  field: formControl(''),
  group: formGroup({
    field: formControl(1),
    field2: formControl(1),
  }),
  array: formArray([
    formControl('1'),
  ]),
  array2: formArray([
    formGroup({
      field: formControl(true),
      f2: formControl(true),
    }),
  ]),
});


function typedForm<T>(controls: TypedFormGroupControls<T>): { [p: string]: AbstractControl } {
  return {};
}

function formGroup<T>(value: TypedFormGroupControls<T>, options?: AbstractControlOptions): TypedFormGroupConfig<T> {
  return {value, options};
}

function formControl<T>(value: T, options: TypedFormControlOptions = null): TypedFormControlConfig<T> {
  return {value, options};
}

function formArray<T>(value: TypedFormArrayItem<T>[], options: AbstractControlOptions = null): TypedFormArrayConfig<T> {
  return {value, options};
}
