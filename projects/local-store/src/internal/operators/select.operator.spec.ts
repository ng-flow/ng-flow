import { subscription } from '@testing/test-subscription';
import { Subject } from 'rxjs';
import { select } from './select.operator';

describe('select()', () => {
  it('should return only distinct values', () => {
    const subject = new Subject<number>();
    const sub = subscription(subject.pipe(select(value => value * 2)));

    subject.next(1);
    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.next(3);
    subject.next(4);
    subject.next(4);
    subject.next(1);

    expect(sub.values).toEqual([2, 4, 6, 8, 2]);
  });
});
