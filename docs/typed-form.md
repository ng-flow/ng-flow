# Typed Form

Adds type safety to Reactive Forms

## Configuration
1. Create `FormModel` interface which will be your form definition
```typescript
interface UserFormModel {
  firstName: string
  lastName: string
  contact: {
    email: string
    phone: string
  }
  hobbies: string[]
}
```

2. Use provided type `TypedForm<T>`, to create `FromGroup` object
```typescript
import { TypedForm } from '@ng-bucket/forms'

const contactControls: TypedForm<UserFormModel['contact']> = {
  email: new FormControl(),
  phone: new FormControl(),
};

const controls: TypedForm<UserFormModel> = {
  firstName: new FormControl(),
  lastName: new FormControl(),
  contact: new FormGroup(contactControls),
  hobbies: new FormArray([]),
};
      
const formGroup = new FormGroup(controls);
```

## Limitations
Type `TypedForm` only helps with creating a `FormGroup` keys, but control's value is not type safe.
So if `UserFormModel` expects `firstName` to be `string` and you pass ex. `boolean` to associated `FormControl`, compiler will not complain.  
