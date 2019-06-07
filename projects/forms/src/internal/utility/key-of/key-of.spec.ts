import { keyOf } from './key-of';

interface FormModel {
  prop: string
}

describe('keyOf', () => {
  it('should return key', () => {
    expect(keyOf<FormModel>('prop')).toEqual('prop');
  });
});
