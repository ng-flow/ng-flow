import { Observable } from 'rxjs';
export declare function propertyChanges<T extends object, K extends keyof T>(obj: T, prop: K): Observable<T[K]>;
