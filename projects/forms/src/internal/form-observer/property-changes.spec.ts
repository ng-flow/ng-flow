import { subscription } from '../test/test-subscription';
import { propertyChanges } from './property-changes';

interface TestObject {
  test: string;
}

describe('propertyChanges', () => {
  let obj: TestObject;

  beforeEach(() => { obj = {test: 'test_initial'}; });

  it('should create observable', () => {
    expect(propertyChanges(obj, 'test')).toBeTruthy();
  });

  it('should emit values', () => {
    const sub = subscription(propertyChanges(obj, 'test'));
    obj.test = 'test_1';
    obj.test = 'test_2';
    obj.test = 'test_3';

    expect(sub.values).toEqual(['test_1', 'test_2', 'test_3']);
  });

  it('should not change property initial value', () => {
    propertyChanges(obj, 'test');
    expect(obj.test).toEqual('test_initial');
  });

  it('should reuse observer', () => {
    const o1$ = propertyChanges(obj, 'test');
    const o2$ = propertyChanges(obj, 'test');

    expect(o1$).toBe(o2$);
  });
});
