import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { enableAll } from './enable-all';

describe('enableAll', () => {
  it('should enable FormGroup children', () => {
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

    expect(formGroup.get('firstName').disabled).toBeTruthy();
    expect(formGroup.get('lastName').disabled).toBeTruthy();
    expect(formGroup.get('contact').enabled).toBeTruthy();
    expect(formGroup.get('contact.email').enabled).toBeTruthy();
    expect(formGroup.get('contact.phone').enabled).toBeTruthy();
  });

  it('should enable FormArray children', () => {
    const formGroup = new FormGroup({
      firstName: new FormControl('Jon'),
      lastName: new FormControl('Doe'),
      hobbies: new FormArray([
        new FormControl('Programming'),
        new FormControl('Taekwondo'),
      ]),
    });

    formGroup.disable();
    enableAll(formGroup.get('hobbies'));

    expect(formGroup.get('firstName').disabled).toBeTruthy();
    expect(formGroup.get('lastName').disabled).toBeTruthy();
    expect(formGroup.get('hobbies').enabled).toBeTruthy();
    expect(formGroup.get('hobbies.0').enabled).toBeTruthy();
    expect(formGroup.get('hobbies.1').enabled).toBeTruthy();
  });
});
