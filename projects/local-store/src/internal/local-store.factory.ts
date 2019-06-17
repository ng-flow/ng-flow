import { Injectable, OnDestroy } from '@angular/core';
import { LocalStore } from './local-store';

@Injectable()
export class LocalStoreFactory<S> implements OnDestroy {
  private readonly stores: LocalStore<any>[] = [];

  create(initialState: S): LocalStore<S> {
    const localStore = new LocalStore<S>(initialState);
    this.stores.push(localStore);

    return localStore;
  }

  ngOnDestroy(): void {
    this.stores.forEach(store => store.dispose());
  }
}
