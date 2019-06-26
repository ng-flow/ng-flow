import { subscription } from '@testing/test-subscription';
import { pipe, Subject, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LocalStore } from './local-store';
import { noAction } from './operators/no-action.operator';

interface TestState {
  value: number
  isEven: boolean
}


describe('LocalStore', () => {
  let localStore: LocalStore<TestState>;

  beforeEach(() => {
    localStore = new LocalStore<TestState>({value: 1, isEven: false});
  });

  afterEach(() => {
    localStore.dispose();
  });

  it('should be created', () => {
    expect(localStore).toBeTruthy();
  });

  it('should has initial state', () => {
    const sub = subscription(localStore);
    expect(sub.values).toEqual([{value: 1, isEven: false}]);
  });

  it('should register actions', () => {
    const testAction = localStore.action<number>('Action', {
      state: (state, value) => ({
        value,
        isEven: value % 2 === 0,
      }),
    });

    const sub = subscription(localStore);

    testAction.dispatch(2);
    testAction.dispatch(3);

    expect(sub.values).toEqual([
      {value: 1, isEven: false},
      {value: 2, isEven: true},
      {value: 3, isEven: false},
    ]);
  });

  it('should dispatch action is stream returns action', () => {
    const subject = new Subject<string>();

    const action1 = localStore.action('Action 1', {
      action: pipe(
        tap(() => subject.next('Action 1')),
        map(() => action2.create()),
      ),
    });

    const action2 = localStore.action('Action 2', {
      action: pipe(
        tap(() => subject.next('Action 2')),
        map(() => action3.create()),
      ),
    });

    const action3 = localStore.action('Action 3', {
      action: pipe(
        tap(() => subject.next('Action 3')),
        noAction(),
      ),
    });

    const sub = subscription(subject);

    action1.dispatch();

    expect(sub.values).toEqual(['Action 1', 'Action 2', 'Action 3']);
  });

  it('should complete all stream on dispose()', () => {
    /* tslint:disable:no-string-literal */
    const sub = subscription(localStore);

    expect(localStore['actions']).toBeTruthy('private "actions" field in LocalStore not found, maybe renamed?');
    const actionsSub = subscription(localStore['actions']);

    const mockedSub = jasmine.createSpyObj<Subscription>('Subscription', ['unsubscribe']);
    expect(localStore['subs']).toBeTruthy('private "subs" field in LocalStore not found, maybe renamed?');
    localStore['subs'].push(mockedSub);

    localStore.dispose();

    expect(sub.completed()).toBe(true);
    expect(actionsSub.completed()).toBe(true);
    expect(mockedSub.unsubscribe).toHaveBeenCalled();
    /* tslint:enable */
  });
});
