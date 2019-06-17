import { LocalStoreFactory } from './local-store.factory';

describe('LocalStoreFactory', () => {
  it('should create LocalSore', () => {
    const localStoreFactory = new LocalStoreFactory();
    expect(localStoreFactory.create({})).toBeTruthy();
  });

  it('should dispose LocalSore on ngOnDestroy', () => {
    const localStoreFactory = new LocalStoreFactory();
    const localStore = localStoreFactory.create({});

    const disposeSpy = spyOn(localStore, 'dispose');

    localStoreFactory.ngOnDestroy();
    expect(disposeSpy).toHaveBeenCalled();
  });
});
