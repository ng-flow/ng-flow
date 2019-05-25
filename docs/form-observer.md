# Form observer
Form observer API lets you observe AbstractControl properties changes.
Each method takes as an argument AbstractControl and returns Observable.
Every time value of given property is changed, new event with current value is emitted.

method            | observed property           | returns
------------------|-----------------------------|--------------------------------------
pristineChanges$  | `AbstractControl.pristine`  | `Observable<boolean>`
dirtyChanges$     | `AbstractControl.dirty`     | `Observable<boolean>`
touchedChanges$   | `AbstractControl.touched`   | `Observable<boolean>`
untouchedChanges$ | `AbstractControl.untouched` | `Observable<boolean>`
statusChanges$    | `AbstractControl.status`    | `Observable<string>`
enabledChanges$   | `AbstractControl.enabled`   | `Observable<boolean>`
disabledChanges$  | `AbstractControl.disabled`  | `Observable<boolean>`
pendingChanges$   | `AbstractControl.pending`   | `Observable<boolean>`
validChanges$     | `AbstractControl.valid`     | `Observable<boolean>`
invalidChanges$   | `AbstractControl.invalid`   | `Observable<boolean>`
valueChanges$     | `AbstractControl.value`     | `Observable<any>`
stateChanges$     | _all properties_            | `Observable<FormObserverStateEvent>`

## Usage
```typescript
import {
  dirtyChanges$,
  disabledChanges$,
  enabledChanges$,
  invalidChanges$,
  pendingChanges$,
  pristineChanges$,
  stateChanges$,
  statusChanges$,
  touchedChanges$,
  untouchedChanges$,
  validChanges$,
  valueChanges$,
} from '@ng-bucket/forms';

const control = new FormControl();

const prinstine$ = pristineChanges$(control);
const dirty$ = dirtyChanges$(control);
const touched$ = touchedChanges$(control);
const untouched$ = untouchedChanges$(control);
const status$ = statusChanges$(control);
const enabled$ = enabledChanges$(control);
const disabled$ = disabledChanges$(control);
const pending$ = pendingChanges$(control);
const valid$ = validChanges$(control);
const invalid$ = invalidChanges$(control);
const value$ = valueChanges$(control);
const state$ = stateChanges$(control);
```

## Problems
With Reactive Forms you often want to react to form changes. 
Reactive Forms API expose two observables:
 * `AbstractControl.valueChanges` for value changes
 * `AbstractControl.statusChanges` for status changes (`disabled` / `enabled` / `pending` / `valid` / `invalid`)

### Problem 1
But what if you want to react to `pristine` / `dirty` or `touched` / `untouched` events?
Unfortunately there is not built-in mechanism for that in Reactive Forms :disappointed:

#### Solution
Use one of: 
 * pristineChanges$()
 * dirtyChanges$()
 * touchedChanges$()
 * untouchedChanges$() 

### Problem 2
When I comes to observing only one of 5 possible statuses (ex. invalid), usage of `AbstractControl.statusChanges` is not as straightforward as you would expect.
First of all `statusChanges` emit strings, so you have to compare those strings 
```typescript
control.statusChanges.pipe(
  map(status => status === 'INVALID')
)
```
or map to property
```typescript
control.statusChanges.pipe(
  map(() => control.invalid)
)
```
Secondly you probably want to be notified only when given status really changes, so you have to remember to use `distinctUntilChanged`.
Because status can change for example from:
* `VALID` => `PENDING` => `VALID` => `INVALID` 

and if you want to observe `control.invalid` you will get:
* `false` => `false` => `false` => `true`

but probably expected:
* `false` => `true` 

Summarizing you have to write:
```typescript
control.statusChanges.pipe(
  map(() => control.invalid),
  distinctUntilChanged()
)
```

This is not so complicated but you have to remember about it. Of course you could simplified it by writing custom operator :smirk: but you will probably end up copy-pasting this custom operator to each project which you will work with

#### Solution
Use one of:
 * enabledChanges$()
 * disabledChanges$()
 * pendingChanges$()
 * validChanges$()
 * invalidChanges$()

### Problem 3
You had written an OnPush component and want to `markForCheck` when `valueChanges`.
So far so good, but what if somewhere in the code there is a line `control.setValue(value, {emitEvent: false})`?

`{emitEvent: false}` is the key, with it `valueChanges` will not emit an event.
But there maybe cases when you want to be notified of value changes regardless of `emitEvent` flag.

#### Solution
Use one of:
 * valueChanges$()
 * stateChanges$() <- probably more desirable

## API
### pristineChanges$
Creates stream of `AbstractControl.pristine` value changes
```typescript
import { pristineChanges$ } from '@ng-bucket/forms'

pristineChanges$(control: AbstractControl): Observable<boolean>
```

### dirtyChanges$
Creates stream of `AbstractControl.dirty` value changes
```typescript
import { dirtyChanges$ } from '@ng-bucket/forms'

dirtyChanges$(control: AbstractControl): Observable<boolean>
```

### touchedChanges$
Creates stream of `AbstractControl.touched` value changes
```typescript
import { touchedChanges$ } from '@ng-bucket/forms'

touchedChanges$(control: AbstractControl): Observable<boolean>
```

### untouchedChanges$
Creates stream of `AbstractControl.untouched` value changes
```typescript
import { untouchedChanges$ } from '@ng-bucket/forms'

untouchedChanges$(control: AbstractControl): Observable<boolean>
```

### statusChanges$
Creates stream of `AbstractControl.status` value changes.
Similar to `AbstractControl.statusChanges`, but not affected by `emitEvent` flag.
```typescript
import { statusChanges$ } from '@ng-bucket/forms'

statusChanges$(control: AbstractControl): Observable<string>
```

### enabledChanges$
Creates stream of `AbstractControl.enabled` value changes.
```typescript
import { enabledChanges$ } from '@ng-bucket/forms'

enabledChanges$(control: AbstractControl): Observable<boolean>
```

### disabledChanges$
Creates stream of `AbstractControl.disabled` value changes.
```typescript
import { disabledChanges$ } from '@ng-bucket/forms'

disabledChanges$(control: AbstractControl): Observable<boolean>
```

### pendingChanges$
Creates stream of `AbstractControl.pending` value changes.
```typescript
import { pendingChanges$ } from '@ng-bucket/forms'

pendingChanges$(control: AbstractControl): Observable<boolean>
```

### validChanges$
Creates stream of `AbstractControl.valid` value changes.
```typescript
import { validChanges$ } from '@ng-bucket/forms'

validChanges$(control: AbstractControl): Observable<boolean>
```

### invalidChanges$
Creates stream of `AbstractControl.invalid` value changes.
```typescript
import { invalidChanges$ } from '@ng-bucket/forms'

invalidChanges$(control: AbstractControl): Observable<boolean>
```

### valueChanges$
Creates stream of `AbstractControl.value` value changes.
Similar to `AbstractControl.valueChanges`, but not affected by `emitEvent` flag.
```typescript
import { valueChanges$ } from '@ng-bucket/forms'

valueChanges$(control: AbstractControl): Observable<any>
```

### stateChanges$
Creates stream that emit event when any of:
* `AbstractControl.pristine` / `AbstractControl.dirty`
* `AbstractControl.touched` / `AbstractControl.untouched`
* `AbstractControl.status`
* `AbstractControl.value`

property value will change.
Not affected by `emitEvent` flag.
```typescript
import { stateChanges$, FormObserverStateEvent } from '@ng-bucket/forms'

stateChanges$(control: AbstractControl): Observable<FormObserverStateEvent>
```

####FormObserverStateEvent
```typescript
interface FormObserverStateEvent {
  pristine: boolean;
  dirty: boolean;
  touched: boolean;
  untouched: boolean;
  status: string;
  enabled: boolean;
  disabled: boolean;
  pending: boolean;
  valid: boolean;
  invalid: boolean;
  value: any;
}
```

## Under the hood
Form observer API changes `PropertyDescriptor` of AbstractControl properties.
`PropertyDescriptor.value` and `PropertyDescriptor.writable` are replaced by `PropertyDescriptor.get` and `PropertyDescriptor.set`.
Then `PropertyDescriptor.set` is used to emit events each time value is assigned.
And finally all Observables returned from API are piped with `distinctUntilChanged` to guarantee only real changes are emitted.

# Contribute
If you find a bug or something which can be improved, feel free to open an issue :thumbsup:

If you're Angular Core Team Developer and found this library useful, 
please consider adding this or similar solution to Reactive Form source code :pray: 
so other developers could benefit from it without relying on hacks :sweat_smile:

I hope one day I will be able to deprecated this library in favor to native solution :smile:
