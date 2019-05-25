export interface FormObserverStateEvent {
    pristine: boolean;
    dirty: boolean;
    touched: boolean;
    untouched: boolean;
    status: string;
    enabled: boolean;
    disabled: boolean;
    pending: boolean;
    valid: boolean;
    invalid: boolean;
    value: any;
}
