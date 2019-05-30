# Form utility methods

## dirtyValues
Iterate recursively over form controls children and pick ups values if particular form control is dirty. 

### API
```typescript
import { dirtyValues } from '@ng-bucket/forms'

dirtyValues<T>(control: FormGroup): T
dirtyValues<T>(control: FormArray): T
dirtyValues<T>(control: FormControl): T | undefined
dirtyValues<T>(control: AbstractControl): T | T | undefined
```

### Usage
```typescript
import { dirtyValues } from '@ng-bucket/forms'

const formGroup = new FormGroup({
  firstName: new FormControl('Jon'),
  lastName: new FormControl('Doe'),
  contact: new FormGroup({
    email: new FormControl('jon.doe@email.com'),
    phone: new FormControl('111-111-111'),
  }),
});

formGroup.get('lastName').markAsDirty();
formGroup.get('contact.email').markAsDirty();

console.log(formGroup.value);
//{
//   firstName: 'Jon', 
//   lastName: 'Doe', 
//   contact: {
//     email: 'jon.doe@email.com', 
//     phone: '111-111-111'
//   }
//}

console.log(dirtyValues(formGroup));
//{
//   lastName: 'Doe', 
//   contact: {
//     email: 'jon.doe@email.com'
//   }
//}
```

## enableAll
Enable control and all of it children

### API
```typescript
import { enableAll } from '@ng-bucket/forms'

enableAll(control: AbstractControl, opts?: { onlySelf?: boolean; emitEvent?: boolean; }) : void
```

Options `{ onlySelf?: boolean; emitEvent?: boolean; }` are passed to `AbstractControl.enable(opts)` but are not intercepted.
So `onlySelf` flag will not prevent children being enabled.

If you want to enable only this control and none of it's parents and / or children, please use native approach `AbstractControl.enable({onlySelf: true})` 

### Usage
```typescript
import { enableAll } from '@ng-bucket/forms'

const formGroup = new FormGroup({
  firstName: new FormControl('Jon'),
  lastName: new FormControl('Doe'),
  contact: new FormGroup({
    email: new FormControl('jon.doe@email.com'),
    phone: new FormControl('111-111-111'),
  }),
});

formGroup.disable();
enableAll(formGroup.get('contact'));

console.log(formGroup.get('firstName').disabled); //true
console.log(formGroup.get('lastName').disabled); //true
console.log(formGroup.get('contact').enabled); //true
console.log(formGroup.get('contact.email').enabled); //true
console.log(formGroup.get('contact.phone').enabled); //true
```
