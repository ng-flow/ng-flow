import { FormControl } from '@angular/forms';
import { subscription } from '@testing/test-subscription';
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
} from './form-observer';
import { FormObserverStateEvent } from './form-observer-state-event';

describe('formObserver', () => {
  describe('pristineChanges$', () => {
    it('should not change control behavior', () => {
      const control = new FormControl();
      pristineChanges$(control);

      expect(control.pristine).toBe(true);

      control.markAsDirty();
      expect(control.pristine).toBe(false);

      control.markAsPristine();
      expect(control.pristine).toBe(true);
    });

    it('should emit changes', () => {
      const control = new FormControl();
      const sub = subscription(pristineChanges$(control));

      control.markAsPristine();
      control.reset();
      expect(sub.values.length).toEqual(0);

      control.markAsDirty();
      control.markAsPristine();

      expect(sub.values).toEqual([false, true]);
    });

    it('should emit only distinct changes', () => {
      const control = new FormControl();
      const sub = subscription(pristineChanges$(control));

      control.markAsDirty();
      control.markAsDirty();
      control.markAsPristine();
      control.markAsPristine();

      expect(sub.values).toEqual([false, true]);
    });
  });

  describe('dirtyChanges$', () => {
    it('should not change control behavior', () => {
      const control = new FormControl();
      dirtyChanges$(control);
      expect(control.dirty).toBe(false);

      control.markAsDirty();
      expect(control.dirty).toBe(true);

      control.markAsPristine();
      expect(control.dirty).toBe(false);

    });

    it('should emit changes', () => {
      const control = new FormControl();
      const sub = subscription(dirtyChanges$(control));

      control.markAsPristine();
      control.reset();
      expect(sub.values.length).toEqual(0);

      control.markAsDirty();
      control.markAsPristine();

      expect(sub.values).toEqual([true, false]);
    });

    it('should emit only distinct changes', () => {
      const control = new FormControl();
      const sub = subscription(dirtyChanges$(control));

      control.markAsDirty();
      control.markAsDirty();
      control.markAsPristine();
      control.markAsPristine();

      expect(sub.values).toEqual([true, false]);
    });
  });

  describe('touchedChanges$', () => {
    it('should not change control behavior', () => {
      const control = new FormControl();
      touchedChanges$(control);

      expect(control.touched).toBe(false);

      control.markAsTouched();
      expect(control.touched).toBe(true);

      control.markAsUntouched();
      expect(control.touched).toBe(false);
    });

    it('should emit changes', () => {
      const control = new FormControl();
      const sub = subscription(touchedChanges$(control));

      control.markAsUntouched();
      control.reset();
      expect(sub.values.length).toEqual(0);

      control.markAsTouched();
      control.markAsUntouched();

      expect(sub.values).toEqual([true, false]);
    });

    it('should emit only distinct changes', () => {
      const control = new FormControl();
      const sub = subscription(touchedChanges$(control));

      control.markAsTouched();
      control.markAsTouched();
      control.markAsUntouched();
      control.markAsUntouched();

      expect(sub.values).toEqual([true, false]);
    });
  });

  describe('untouchedChanges$', () => {
    it('should not change control behavior', () => {
      const control = new FormControl();
      untouchedChanges$(control);
      expect(control.untouched).toBe(true);

      control.markAsTouched();
      expect(control.untouched).toBe(false);

      control.markAsUntouched();
      expect(control.untouched).toBe(true);
    });

    it('should emit changes', () => {
      const control = new FormControl();
      const sub = subscription(untouchedChanges$(control));

      control.markAsUntouched();
      control.reset();
      expect(sub.values.length).toEqual(0);

      control.markAsTouched();
      control.markAsUntouched();

      expect(sub.values).toEqual([false, true]);
    });

    it('should emit only distinct changes', () => {
      const control = new FormControl();
      const sub = subscription(untouchedChanges$(control));

      control.markAsTouched();
      control.markAsTouched();
      control.markAsUntouched();
      control.markAsUntouched();

      expect(sub.values).toEqual([false, true]);
    });
  });

  describe('statusChanges$', () => {
    it('should not change control behavior', () => {
      const control = new FormControl();
      statusChanges$(control);
      expect(control.enabled).toBe(true);
      expect(control.disabled).toBe(false);
      expect(control.pending).toBe(false);
      expect(control.valid).toBe(true);
      expect(control.invalid).toBe(false);

      control.disable();
      expect(control.enabled).toBe(false);
      expect(control.disabled).toBe(true);
      expect(control.pending).toBe(false);
      expect(control.valid).toBe(false);
      expect(control.invalid).toBe(false);

      control.enable();
      expect(control.enabled).toBe(true);
      expect(control.disabled).toBe(false);
      expect(control.pending).toBe(false);
      expect(control.valid).toBe(true);
      expect(control.invalid).toBe(false);

      control.markAsPending();
      expect(control.enabled).toBe(true);
      expect(control.disabled).toBe(false);
      expect(control.pending).toBe(true);
      expect(control.valid).toBe(false);
      expect(control.invalid).toBe(false);

      control.updateValueAndValidity();
      expect(control.enabled).toBe(true);
      expect(control.disabled).toBe(false);
      expect(control.pending).toBe(false);
      expect(control.valid).toBe(true);
      expect(control.invalid).toBe(false);

      control.setErrors({error: true});
      expect(control.enabled).toBe(true);
      expect(control.disabled).toBe(false);
      expect(control.pending).toBe(false);
      expect(control.valid).toBe(false);
      expect(control.invalid).toBe(true);

      control.setErrors(null);
      expect(control.enabled).toBe(true);
      expect(control.disabled).toBe(false);
      expect(control.pending).toBe(false);
      expect(control.valid).toBe(true);
      expect(control.invalid).toBe(false);
    });

    it('should emit changes', () => {
      const control = new FormControl();
      const sub = subscription(statusChanges$(control));

      control.enable();
      control.updateValueAndValidity();
      control.setErrors(null);
      control.reset();
      expect(sub.values.length).toEqual(0);

      control.disable();
      control.enable();
      control.markAsPending();
      control.updateValueAndValidity();
      control.setErrors({error: true});
      control.setErrors(null);

      expect(sub.values).toEqual(['DISABLED', 'VALID', 'PENDING', 'VALID', 'INVALID', 'VALID']);
    });

    it('should emit only distinct changes', () => {
      const control = new FormControl();
      const sub = subscription(statusChanges$(control));
      control.disable();
      control.disable();
      control.enable();
      control.enable();
      control.markAsPending();
      control.markAsPending();
      control.updateValueAndValidity();
      control.updateValueAndValidity();
      control.setErrors({error: true});
      control.setErrors({error: true});
      control.setErrors(null);
      control.setErrors(null);

      expect(sub.values).toEqual(['DISABLED', 'VALID', 'PENDING', 'VALID', 'INVALID', 'VALID']);
    });

    it('should not be affected by emitEvent flag', () => {
      const control = new FormControl();
      const sub = subscription(statusChanges$(control));
      control.disable({emitEvent: false});
      control.enable({emitEvent: false});
      control.markAsPending({emitEvent: false});
      control.updateValueAndValidity({emitEvent: false});
      control.setErrors({error: true}, {emitEvent: false});
      control.setErrors(null, {emitEvent: false});

      expect(sub.values).toEqual(['DISABLED', 'VALID', 'PENDING', 'VALID', 'INVALID', 'VALID']);
    });
  });

  describe('enabledChanges$', () => {
    it('should not change control behavior', () => {
      const control = new FormControl();
      enabledChanges$(control);
      expect(control.enabled).toBe(true);

      control.disable();
      expect(control.enabled).toBe(false);

      control.enable();
      expect(control.enabled).toBe(true);
    });

    it('should emit changes', () => {
      const control = new FormControl();
      const sub = subscription(enabledChanges$(control));

      control.enable();
      control.markAsPending();
      control.updateValueAndValidity();
      control.setErrors({error: null});
      control.setErrors(null);
      control.reset();
      expect(sub.values.length).toEqual(0);

      control.disable();
      control.enable();

      expect(sub.values).toEqual([false, true]);
    });

    it('should emit only distinct changes', () => {
      const control = new FormControl();
      const sub = subscription(enabledChanges$(control));

      control.disable();
      control.enable();
      control.markAsPending();
      control.updateValueAndValidity();
      control.setErrors({error: true});
      control.setErrors(null);

      expect(sub.values).toEqual([false, true]);
    });

    it('should not be affected by emitEvent flag', () => {
      const control = new FormControl();
      const sub = subscription(enabledChanges$(control));

      control.disable({emitEvent: false});
      control.enable({emitEvent: false});

      expect(sub.values).toEqual([false, true]);
    });
  });

  describe('disabledChanges$', () => {
    it('should not change control behavior', () => {
      const control = new FormControl();
      disabledChanges$(control);
      expect(control.disabled).toBe(false);

      control.disable();
      expect(control.disabled).toBe(true);

      control.enable();
      expect(control.disabled).toBe(false);
    });

    it('should emit changes', () => {
      const control = new FormControl();
      const sub = subscription(disabledChanges$(control));

      control.enable();
      control.markAsPending();
      control.updateValueAndValidity();
      control.setErrors({error: null});
      control.setErrors(null);
      control.reset();
      expect(sub.values.length).toEqual(0);

      control.disable();
      control.enable();

      expect(sub.values).toEqual([true, false]);
    });

    it('should emit only distinct changes', () => {
      const control = new FormControl();
      const sub = subscription(disabledChanges$(control));

      control.disable();
      control.disable();
      control.enable();
      control.enable();

      expect(sub.values).toEqual([true, false]);
    });

    it('should not be affected by emitEvent flag', () => {
      const control = new FormControl();
      const sub = subscription(disabledChanges$(control));

      control.disable({emitEvent: false});
      control.enable({emitEvent: false});

      expect(sub.values).toEqual([true, false]);
    });
  });

  describe('pendingChanges$', () => {
    it('should not change control behavior', () => {
      const control = new FormControl();
      pendingChanges$(control);
      expect(control.pending).toBe(false);

      control.markAsPending();
      expect(control.pending).toBe(true);

      control.updateValueAndValidity();
      expect(control.pending).toBe(false);
    });

    it('should emit changes', () => {
      const control = new FormControl();
      const sub = subscription(pendingChanges$(control));

      control.enable();
      control.disable();
      control.updateValueAndValidity();
      control.setErrors({error: null});
      control.setErrors(null);
      control.reset();
      expect(sub.values.length).toEqual(0);

      control.markAsPending();
      control.updateValueAndValidity();

      expect(sub.values).toEqual([true, false]);
    });

    it('should emit only distinct changes', () => {
      const control = new FormControl();
      const sub = subscription(pendingChanges$(control));

      control.markAsPending();
      control.markAsPending();
      control.updateValueAndValidity();
      control.updateValueAndValidity();

      expect(sub.values).toEqual([true, false]);
    });

    it('should not be affected by emitEvent flag', () => {
      const control = new FormControl();
      const sub = subscription(pendingChanges$(control));

      control.markAsPending({emitEvent: false});
      control.updateValueAndValidity({emitEvent: false});

      expect(sub.values).toEqual([true, false]);
    });
  });

  describe('validChanges$', () => {
    it('should not change control behavior', () => {
      const control = new FormControl();
      validChanges$(control);
      expect(control.valid).toBe(true);

      control.setErrors({error: true});
      expect(control.valid).toBe(false);

      control.setErrors(null);
      expect(control.valid).toBe(true);
    });

    it('should emit changes', () => {
      const control = new FormControl();
      const sub = subscription(validChanges$(control));

      control.enable();
      control.updateValueAndValidity();
      control.setErrors(null);
      control.reset();
      expect(sub.values.length).toEqual(0);

      control.setErrors({error: true});
      control.setErrors(null);

      expect(sub.values).toEqual([false, true]);
    });

    it('should emit only distinct changes', () => {
      const control = new FormControl();
      const sub = subscription(validChanges$(control));

      control.setErrors({error: true});
      control.setErrors({error: true});
      control.setErrors(null);
      control.setErrors(null);

      expect(sub.values).toEqual([false, true]);
    });

    it('should not be affected by emitEvent flag', () => {
      const control = new FormControl();
      const sub = subscription(validChanges$(control));

      control.setErrors({error: true}, {emitEvent: false});
      control.setErrors(null, {emitEvent: false});

      expect(sub.values).toEqual([false, true]);
    });
  });

  describe('invalidChanges$', () => {
    it('should not change control behavior', () => {
      const control = new FormControl();
      invalidChanges$(control);
      expect(control.invalid).toBe(false);

      control.setErrors({error: true});
      expect(control.invalid).toBe(true);

      control.setErrors(null);
      expect(control.invalid).toBe(false);
    });

    it('should emit changes', () => {
      const control = new FormControl();
      const sub = subscription(invalidChanges$(control));

      control.enable();
      control.disable();
      control.updateValueAndValidity();
      control.markAsPending();
      control.setErrors(null);
      control.reset();
      expect(sub.values.length).toEqual(0);

      control.setErrors({error: true});
      control.setErrors(null);

      expect(sub.values).toEqual([true, false]);
    });

    it('should emit only distinct changes', () => {
      const control = new FormControl();
      const sub = subscription(invalidChanges$(control));

      control.setErrors({error: true});
      control.setErrors({error: true});
      control.setErrors(null);
      control.setErrors(null);

      expect(sub.values).toEqual([true, false]);
    });

    it('should not be affected by emitEvent flag', () => {
      const control = new FormControl();
      const sub = subscription(invalidChanges$(control));

      control.setErrors({error: true}, {emitEvent: false});
      control.setErrors(null, {emitEvent: false});

      expect(sub.values).toEqual([true, false]);
    });
  });

  describe('valueChanges$', () => {
    it('should not change control behavior', () => {
      const control = new FormControl();
      valueChanges$(control);
      expect(control.value).toBe(null);

      control.setValue('SET_VALUE');
      expect(control.value).toBe('SET_VALUE');

      control.patchValue('PATCH_VALUE');
      expect(control.value).toBe('PATCH_VALUE');

      control.reset('RESET');
      expect(control.value).toBe('RESET');
    });

    it('should emit changes', () => {
      const control = new FormControl();
      const sub = subscription(valueChanges$(control));

      control.setValue(null);
      control.patchValue(null);
      control.reset(null);
      expect(sub.values.length).toEqual(0);

      control.setValue('SET_VALUE');
      control.patchValue('PATCH_VALUE');
      control.reset('RESET');

      expect(sub.values).toEqual(['SET_VALUE', 'PATCH_VALUE', 'RESET']);
    });

    it('should emit only distinct changes', () => {
      const control = new FormControl();
      const sub = subscription(valueChanges$(control));

      control.setValue('VALUE_1');
      control.patchValue('VALUE_1');
      control.reset('VALUE_1');

      control.setValue('VALUE_2');
      control.patchValue('VALUE_2');
      control.reset('VALUE_2');

      expect(sub.values).toEqual(['VALUE_1', 'VALUE_2']);
    });

    it('should not be affected by emitEvent flag', () => {
      const control = new FormControl();
      const sub = subscription(valueChanges$(control));

      control.setValue('SET_VALUE', {emitEvent: false});
      control.patchValue('PATCH_VALUE', {emitEvent: false});
      control.reset('RESET', {emitEvent: false});

      expect(sub.values).toEqual(['SET_VALUE', 'PATCH_VALUE', 'RESET']);
    });
  });

  describe('stateChanges$', () => {
    const INITIAL: FormObserverStateEvent = Object.freeze({
      pristine: true,
      dirty: false,
      touched: false,
      untouched: true,
      status: 'VALID',
      enabled: true,
      disabled: false,
      pending: false,
      valid: true,
      invalid: false,
      value: null,
    });

    it('should not emit', () => {
      const control = new FormControl(null);
      const sub = subscription(stateChanges$(control));

      control.setValue(null);
      control.patchValue(null);
      control.markAsPristine();
      control.markAsUntouched();
      control.enable();
      control.updateValueAndValidity();
      control.setErrors(null);
      control.reset();
      expect(sub.values.length).toEqual(0);
    });

    it('should emit when pristine / dirty change', () => {
      const control = new FormControl(null);
      const sub = subscription(stateChanges$(control));

      control.markAsDirty();
      control.markAsPristine();

      expect(sub.values).toEqual([
        {...INITIAL, pristine: false, dirty: true},
        {...INITIAL, pristine: true, dirty: false},
      ]);
    });

    it('should emit when touched / untouched change', () => {
      const control = new FormControl(null);
      const sub = subscription(stateChanges$(control));

      control.markAsTouched();
      control.markAsUntouched();

      expect(sub.values).toEqual([
        {...INITIAL, touched: true, untouched: false},
        {...INITIAL, touched: false, untouched: true},
      ]);
    });

    it('should emit when disabled / enabled change', () => {
      const control = new FormControl();
      const sub = subscription(stateChanges$(control));

      control.disable();
      control.enable();

      expect(sub.values).toEqual([
        {...INITIAL, status: 'DISABLED', enabled: false, disabled: true, valid: false},
        {...INITIAL},
      ]);
    });

    it('should emit when pending change', () => {
      const control = new FormControl(null);
      const sub = subscription(stateChanges$(control));

      control.markAsPending();
      control.updateValueAndValidity();

      control.markAsPending();
      control.setErrors({error: true});

      expect(sub.values).toEqual([
        {...INITIAL, status: 'PENDING', pending: true, valid: false},
        {...INITIAL},
        {...INITIAL, status: 'PENDING', pending: true, valid: false},
        {...INITIAL, status: 'INVALID', valid: false, invalid: true},
      ]);
    });

    it('should emit when valid / invalid change', () => {
      const control = new FormControl(null);
      const sub = subscription(stateChanges$(control));

      control.setErrors({error: true});
      control.setErrors(null);

      expect(sub.values).toEqual([
        {...INITIAL, status: 'INVALID', valid: false, invalid: true},
        {...INITIAL},
      ]);
    });

    it('should not be affected by emitEvent flag', () => {
      const control = new FormControl(null);
      const sub = subscription(stateChanges$(control));

      control.disable({emitEvent: false});
      control.enable({emitEvent: false});
      control.markAsPending({emitEvent: false});
      control.updateValueAndValidity({emitEvent: false});
      control.setErrors({error: true}, {emitEvent: false});
      control.setErrors(null, {emitEvent: false});

      expect(sub.values).toEqual([
        {...INITIAL, status: 'DISABLED', enabled: false, disabled: true, valid: false},
        {...INITIAL},
        {...INITIAL, status: 'PENDING', pending: true, valid: false},
        {...INITIAL},
        {...INITIAL, status: 'INVALID', valid: false, invalid: true},
        {...INITIAL},
      ]);
    });
  });
});
