import { OperatorFunction } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { NoAction } from '../action';

export function noAction(): OperatorFunction<any, NoAction> {
  return mapTo({dispatch: false});
}
