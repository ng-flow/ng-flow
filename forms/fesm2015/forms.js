import { distinctUntilChanged, map, skipWhile } from 'rxjs/operators';
import { Subject, merge } from 'rxjs';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T, K
 * @param {?} obj
 * @param {?} prop
 * @return {?}
 */
function propertyChanges(obj, prop) {
    /** @type {?} */
    const propertyObserver = getPropertyObserver(obj);
    if (!propertyObserver[prop]) {
        /** @type {?} */
        const subject = new Subject();
        onChange(obj, prop, (/**
         * @param {?} newValue
         * @return {?}
         */
        newValue => subject.next(newValue)));
        propertyObserver[prop] = subject.asObservable();
    }
    return propertyObserver[prop];
}
/**
 * @template T
 * @param {?} obj
 * @return {?}
 */
function getPropertyObserver(obj) {
    /** @type {?} */
    const PROPERTY_OBSERVER_KEY = 'ng-bucket';
    if (!obj[PROPERTY_OBSERVER_KEY]) {
        Object.defineProperty(obj, PROPERTY_OBSERVER_KEY, { enumerable: false, value: {} });
    }
    return obj[PROPERTY_OBSERVER_KEY];
}
/**
 * @template T, K
 * @param {?} obj
 * @param {?} prop
 * @param {?} callback
 * @return {?}
 */
function onChange(obj, prop, callback) {
    /** @type {?} */
    const descriptor = createDescriptor(obj, prop);
    /** @type {?} */
    const setter = descriptor.set;
    descriptor.set = (/**
     * @return {?}
     */
    function () {
        setter.apply(setter, arguments);
        callback(arguments[0]);
    });
    Object.defineProperty(obj, prop, descriptor);
}
/**
 * @template T, K
 * @param {?} obj
 * @param {?} prop
 * @return {?}
 */
function createDescriptor(obj, prop) {
    /** @type {?} */
    let descriptor = Object.getOwnPropertyDescriptor(obj, prop);
    if (descriptor.hasOwnProperty('value') && descriptor.writable) {
        /** @type {?} */
        let value = descriptor.value;
        descriptor = Object.assign({}, descriptor);
        descriptor.set = (/**
         * @param {?} v
         * @return {?}
         */
        v => value = v);
        descriptor.get = (/**
         * @return {?}
         */
        () => value);
        delete descriptor.value;
        delete descriptor.writable;
    }
    return descriptor;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} control
 * @return {?}
 */
function pristineChanges$(control) {
    return propertyChanges(control, 'pristine').pipe(map((/**
     * @return {?}
     */
    () => control.pristine)), skipWhile(initialValue(control.pristine)), distinctUntilChanged());
}
/**
 * @param {?} control
 * @return {?}
 */
function dirtyChanges$(control) {
    return pristineChanges$(control).pipe(map((/**
     * @param {?} pristine
     * @return {?}
     */
    pristine => !pristine)));
}
/**
 * @param {?} control
 * @return {?}
 */
function touchedChanges$(control) {
    return propertyChanges(control, 'touched').pipe(map((/**
     * @return {?}
     */
    () => control.touched)), skipWhile(initialValue(control.touched)), distinctUntilChanged());
}
/**
 * @param {?} control
 * @return {?}
 */
function untouchedChanges$(control) {
    return touchedChanges$(control).pipe(map((/**
     * @param {?} touched
     * @return {?}
     */
    touched => !touched)));
}
/**
 * @param {?} control
 * @return {?}
 */
function statusChanges$(control) {
    return propertyChanges(control, 'status').pipe(map((/**
     * @return {?}
     */
    () => control.status)), skipWhile(initialValue(control.status)), distinctUntilChanged());
}
/**
 * @param {?} control
 * @return {?}
 */
function enabledChanges$(control) {
    return statusChanges$(control).pipe(map((/**
     * @return {?}
     */
    () => control.enabled)), skipWhile(initialValue(control.enabled)), distinctUntilChanged());
}
/**
 * @param {?} control
 * @return {?}
 */
function disabledChanges$(control) {
    return enabledChanges$(control).pipe(map((/**
     * @param {?} enabled
     * @return {?}
     */
    enabled => !enabled)));
}
/**
 * @param {?} control
 * @return {?}
 */
function pendingChanges$(control) {
    return statusChanges$(control).pipe(map((/**
     * @return {?}
     */
    () => control.pending)), skipWhile(initialValue(control.pending)), distinctUntilChanged());
}
/**
 * @param {?} control
 * @return {?}
 */
function validChanges$(control) {
    return statusChanges$(control).pipe(map((/**
     * @return {?}
     */
    () => control.valid)), skipWhile(initialValue(control.valid)), distinctUntilChanged());
}
/**
 * @param {?} control
 * @return {?}
 */
function invalidChanges$(control) {
    return statusChanges$(control).pipe(map((/**
     * @return {?}
     */
    () => control.invalid)), skipWhile(initialValue(control.invalid)), distinctUntilChanged());
}
/**
 * @param {?} control
 * @return {?}
 */
function valueChanges$(control) {
    return propertyChanges(control, 'value').pipe(map((/**
     * @return {?}
     */
    () => control.value)), skipWhile(initialValue(control.value)), distinctUntilChanged());
}
/**
 * @param {?} control
 * @return {?}
 */
function stateChanges$(control) {
    return merge(pristineChanges$(control), touchedChanges$(control), statusChanges$(control), valueChanges$(control)).pipe(map((/**
     * @return {?}
     */
    () => ({
        pristine: control.pristine,
        dirty: control.dirty,
        touched: control.touched,
        untouched: control.untouched,
        status: control.status,
        enabled: control.enabled,
        disabled: control.disabled,
        pending: control.pending,
        valid: control.valid,
        invalid: control.invalid,
        value: control.value,
    }))));
}
// tslint:disable-next-line:no-shadowed-variable
/**
 * @template T
 * @param {?} initialValue
 * @return {?}
 */
function initialValue(initialValue) {
    return (/**
     * @param {?} value
     * @return {?}
     */
    value => value === initialValue);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { pristineChanges$, dirtyChanges$, touchedChanges$, untouchedChanges$, statusChanges$, enabledChanges$, disabledChanges$, pendingChanges$, validChanges$, invalidChanges$, valueChanges$, stateChanges$, propertyChanges as ɵa };

//# sourceMappingURL=forms.js.map