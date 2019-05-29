export type TypedFormGroupModel<T extends object> = { discriminator: 'TypedFormGroup' }
export type TypedFormArrayModel<T> = { discriminator: 'TypedFormArray' }

export type TypeFormGroupControls<T> = {
  [P in keyof T]: T[P] extends TypedFormGroupModel<infer U>
    ? TypedFormGroup<U>
    : T[P] extends TypedFormArrayModel<infer U>
      ? TypedFormArray<U>
      : TypedFormControl<T[P]>
}

export class TypedFormGroup<T> {
  constructor(controls: TypeFormGroupControls<T>) {
    this.controls = controls;
  }

  controls: TypeFormGroupControls<T>;
}

export class TypedFormControl<T> {
  constructor(value: T) {
    this.value = value;
  }

  value: T;
}

export type TypedFormArrayItem<T> = T extends TypedFormGroupModel<infer U>
  ? TypedFormGroup<U>
  : T extends TypedFormArrayModel<infer U>
    ? TypedFormArray<U>
    : TypedFormControl<T>;

export class TypedFormArray<T> {
  constructor(items: TypedFormArrayItem<T>[]) {
    this.items = items;
  }

  items: TypedFormArrayItem<T>[];
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//tests 1
interface FormModel {
  field: string
  group: {
    prop1: boolean
  }
}


const formGroup = new TypedFormGroup<FormModel>({
  field: new TypedFormControl(''),
  group: new TypedFormControl({
    prop1: true,
  }),
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//tests 2
interface FormModel2 {
  field: string
  group: TypedFormGroupModel<{
    prop1: boolean
  }>
}


const formGroup2 = new TypedFormGroup<FormModel2>({
  field: new TypedFormControl(''),
  group: new TypedFormGroup({
    prop1: new TypedFormControl(true),
  }),
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//tests 3
interface FormModel3 {
  field: string
  group: TypedFormGroupModel<{
    prop1: boolean
  }>
  array: TypedFormArrayModel<string>
}


const formGroup3 = new TypedFormGroup<FormModel3>({
  field: new TypedFormControl(''),
  group: new TypedFormGroup({
    prop1: new TypedFormControl(true),
  }),
  array: new TypedFormArray([
    new TypedFormControl('')
  ])
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//tests 4
interface FormModel4 {
  field: string
  group: TypedFormGroupModel<{
    prop1: boolean
  }>
  array: TypedFormArrayModel<TypedFormGroupModel<{
    prop2: boolean
  }>>
}


const formGroup4 = new TypedFormGroup<FormModel4>({
  field: new TypedFormControl(''),
  group: new TypedFormGroup({
    prop1: new TypedFormControl(true),
  }),
  array: new TypedFormArray([
    new TypedFormGroup({
      prop2: new TypedFormControl(true)
    })
  ])
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//tests 5
interface FormModel5 {
  group: TypedFormGroupModel<{
    nested: TypedFormGroupModel<{
      prop: number
    }>
  }>
}


// const formGroup5 = new TypedFormGroup<FormModel5>({
//   group: new TypedFormGroup({
//     nested: new TypedFormGroup({
//       prop: new TypedFormControl(1)
//     })
//   })
// });
