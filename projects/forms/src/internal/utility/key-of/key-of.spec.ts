import { keyOf } from './key-of';

type FormModel = {
  prop: string
}

describe('keyOf', () => {
  it('should return key', () => {
    expect(keyOf<FormModel>('prop')).toEqual('prop');
  });
});
