import { subscription } from '@testing/test-subscription';
import { of } from 'rxjs';
import { noAction } from './no-action.operator';

describe('noAction()', () => {
  it('should return NoAction', () => {
    const sub = subscription(of(1, 2, 3).pipe(noAction()));

    expect(sub.values).toEqual([{dispatch: false}, {dispatch: false}, {dispatch: false}]);
  });
});
