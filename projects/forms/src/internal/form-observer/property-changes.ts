import { Observable, Subject } from 'rxjs';

export function propertyChanges<T extends object, K extends keyof T>(obj: T, prop: K): Observable<T[K]> {
  const propertyObserver = getPropertyObserver(obj);

  if (!propertyObserver[prop]) {
    const subject = new Subject<T[K]>();
    onChange(obj, prop, newValue => subject.next(newValue));
    propertyObserver[prop] = subject.asObservable();
  }

  return propertyObserver[prop];
}

function getPropertyObserver<T extends object>(obj: T): { [K in keyof T]?: Observable<T[K]> } {
  const PROPERTY_OBSERVER_KEY = 'ng-bucket';

  if (!obj[PROPERTY_OBSERVER_KEY]) {
    Object.defineProperty(obj, PROPERTY_OBSERVER_KEY, {enumerable: false, value: {}});
  }

  return obj[PROPERTY_OBSERVER_KEY];
}

function onChange<T extends object, K extends keyof T>(obj: T, prop: K, callback: (value: T[K]) => void) {
  const descriptor = createDescriptor(obj, prop);
  const setter = descriptor.set;
  descriptor.set = function() {
    setter.apply(setter, arguments);
    callback(arguments[0]);
  };

  Object.defineProperty(obj, prop, descriptor);
}

function createDescriptor<T extends object, K extends keyof T>(obj: T, prop: K): PropertyDescriptor {
  let descriptor = Object.getOwnPropertyDescriptor(obj, prop);

  if (descriptor.hasOwnProperty('value') && descriptor.writable) {
    let value = descriptor.value;
    descriptor = {...descriptor};

    descriptor.set = v => value = v;
    descriptor.get = () => value;

    delete descriptor.value;
    delete descriptor.writable;
  }

  return descriptor;
}
