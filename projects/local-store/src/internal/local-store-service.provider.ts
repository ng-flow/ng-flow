import { Type } from '@angular/core';
import { LocalStoreFactory } from './local-store.factory';

export function localStoreService<T>(service: Type<T>) {
  return [LocalStoreFactory, service];
}
