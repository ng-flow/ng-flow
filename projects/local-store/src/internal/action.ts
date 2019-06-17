export interface Action<P = any> {
  type: string,
  payload: P
}

export interface NoAction {
  dispatch: false;
}

export function isAction<A extends Action>(obj: A | NoAction): obj is A {
  return obj.hasOwnProperty('type');
}
