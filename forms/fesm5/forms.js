import { distinctUntilChanged, map, skipWhile } from 'rxjs/operators';
import { __assign } from 'tslib';
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
    var propertyObserver = getPropertyObserver(obj);
    if (!propertyObserver[prop]) {
        /** @type {?} */
        var subject_1 = new Subject();
        onChange(obj, prop, (/**
         * @param {?} newValue
         * @return {?}
         */
        function (newValue) { return subject_1.next(newValue); }));
        propertyObserver[prop] = subject_1.asObservable();
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
    var PROPERTY_OBSERVER_KEY = 'ng-bucket';
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
    var descriptor = createDescriptor(obj, prop);
    /** @type {?} */
    var setter = descriptor.set;
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
    var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
    if (descriptor.hasOwnProperty('value') && descriptor.writable) {
        /** @type {?} */
        var value_1 = descriptor.value;
        descriptor = __assign({}, descriptor);
        descriptor.set = (/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return value_1 = v; });
        descriptor.get = (/**
         * @return {?}
         */
        function () { return value_1; });
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
    function () { return control.pristine; })), skipWhile(initialValue(control.pristine)), distinctUntilChanged());
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
    function (pristine) { return !pristine; })));
}
/**
 * @param {?} control
 * @return {?}
 */
function touchedChanges$(control) {
    return propertyChanges(control, 'touched').pipe(map((/**
     * @return {?}
     */
    function () { return control.touched; })), skipWhile(initialValue(control.touched)), distinctUntilChanged());
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
    function (touched) { return !touched; })));
}
/**
 * @param {?} control
 * @return {?}
 */
function statusChanges$(control) {
    return propertyChanges(control, 'status').pipe(map((/**
     * @return {?}
     */
    function () { return control.status; })), skipWhile(initialValue(control.status)), distinctUntilChanged());
}
/**
 * @param {?} control
 * @return {?}
 */
function enabledChanges$(control) {
    return statusChanges$(control).pipe(map((/**
     * @return {?}
     */
    function () { return control.enabled; })), skipWhile(initialValue(control.enabled)), distinctUntilChanged());
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
    function (enabled) { return !enabled; })));
}
/**
 * @param {?} control
 * @return {?}
 */
function pendingChanges$(control) {
    return statusChanges$(control).pipe(map((/**
     * @return {?}
     */
    function () { return control.pending; })), skipWhile(initialValue(control.pending)), distinctUntilChanged());
}
/**
 * @param {?} control
 * @return {?}
 */
function validChanges$(control) {
    return statusChanges$(control).pipe(map((/**
     * @return {?}
     */
    function () { return control.valid; })), skipWhile(initialValue(control.valid)), distinctUntilChanged());
}
/**
 * @param {?} control
 * @return {?}
 */
function invalidChanges$(control) {
    return statusChanges$(control).pipe(map((/**
     * @return {?}
     */
    function () { return control.invalid; })), skipWhile(initialValue(control.invalid)), distinctUntilChanged());
}
/**
 * @param {?} control
 * @return {?}
 */
function valueChanges$(control) {
    return propertyChanges(control, 'value').pipe(map((/**
     * @return {?}
     */
    function () { return control.value; })), skipWhile(initialValue(control.value)), distinctUntilChanged());
}
/**
 * @param {?} control
 * @return {?}
 */
function stateChanges$(control) {
    return merge(pristineChanges$(control), touchedChanges$(control), statusChanges$(control), valueChanges$(control)).pipe(map((/**
     * @return {?}
     */
    function () { return ({
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
    }); })));
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
    function (value) { return value === initialValue; });
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