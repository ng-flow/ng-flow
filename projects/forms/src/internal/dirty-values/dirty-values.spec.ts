import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { keyOf, TypedForm } from '../types/typed-form';
import { dirtyValues } from './dirty-values';

describe('dirtyValues', () => {
  describe('#FormGroup', () => {
    let formGroup: FormGroup;
    type FormModel = { field: string }

    beforeEach(() => {
      const controls: TypedForm<FormModel> = {
        field: new FormControl(''),
      };

      formGroup = new FormGroup(controls);
    });

    it('should return empty object', () => {
      expect(formGroup.pristine).toBeTruthy();
      expect(dirtyValues(formGroup)).toEqual({});
    });

    it('should return dirty properties', () => {
      const control = formGroup.get(keyOf<FormModel>('field'));
      control.setValue('NEW_VALUE');
      control.markAsDirty();

      expect(formGroup.dirty).toBeTruthy();
      expect(dirtyValues(formGroup)).toEqual({field1: 'NEW_VALUE'});
    });
  });

  describe('#FormArray', () => {
    let formArray: FormArray;

    beforeEach(() => {
      const value: AbstractControl[] = [
        new FormControl('TEST_1'),
        new FormControl('TEST_2'),
      ];

      formArray = new FormArray(value);
    });

    it('should return empty array', () => {
      expect(formArray.pristine).toBeTruthy();
    });

    it('should return only dirty items', () => {
      const control = formArray.at(1);
      control.setValue('NEW_VALUE');
      control.markAsDirty();

      expect(formArray.dirty).toBeTruthy();
      expect(dirtyValues(formArray)).toEqual(['NEW_VALUE']);
    });
  });

  describe('#FormControl', () => {
    let formControl: FormControl;

    beforeEach(() => {
      formControl = new FormControl('TEST');
    });

    it('should return undefined', () => {
      expect(formControl.pristine).toBeTruthy();
      expect(dirtyValues(formControl)).toBeUndefined();
    });

    it('should return values', () => {
      formControl.setValue('NEW_VALUE');
      formControl.markAsDirty();

      expect(formControl.dirty).toBeTruthy();
      expect(dirtyValues(formControl)).toEqual('NEW_VALUE');
    });
  });
});
