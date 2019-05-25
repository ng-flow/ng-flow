(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs/operators'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('@ng-bucket/forms', ['exports', 'rxjs/operators', 'rxjs'], factory) :
    (factory((global['ng-bucket'] = global['ng-bucket'] || {}, global['ng-bucket'].forms = {}),global.rxjs.operators,global.rxjs));
}(this, (function (exports,operators,rxjs) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

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
            var subject_1 = new rxjs.Subject();
            onChange(obj, prop, ( /**
             * @param {?} newValue
             * @return {?}
             */function (newValue) { return subject_1.next(newValue); }));
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
        descriptor.set = ( /**
         * @return {?}
         */function () {
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
            descriptor.set = ( /**
             * @param {?} v
             * @return {?}
             */function (v) { return value_1 = v; });
            descriptor.get = ( /**
             * @return {?}
             */function () { return value_1; });
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
        return propertyChanges(control, 'pristine').pipe(operators.map(( /**
         * @return {?}
         */function () { return control.pristine; })), operators.skipWhile(initialValue(control.pristine)), operators.distinctUntilChanged());
    }
    /**
     * @param {?} control
     * @return {?}
     */
    function dirtyChanges$(control) {
        return pristineChanges$(control).pipe(operators.map(( /**
         * @param {?} pristine
         * @return {?}
         */function (pristine) { return !pristine; })));
    }
    /**
     * @param {?} control
     * @return {?}
     */
    function touchedChanges$(control) {
        return propertyChanges(control, 'touched').pipe(operators.map(( /**
         * @return {?}
         */function () { return control.touched; })), operators.skipWhile(initialValue(control.touched)), operators.distinctUntilChanged());
    }
    /**
     * @param {?} control
     * @return {?}
     */
    function untouchedChanges$(control) {
        return touchedChanges$(control).pipe(operators.map(( /**
         * @param {?} touched
         * @return {?}
         */function (touched) { return !touched; })));
    }
    /**
     * @param {?} control
     * @return {?}
     */
    function statusChanges$(control) {
        return propertyChanges(control, 'status').pipe(operators.map(( /**
         * @return {?}
         */function () { return control.status; })), operators.skipWhile(initialValue(control.status)), operators.distinctUntilChanged());
    }
    /**
     * @param {?} control
     * @return {?}
     */
    function enabledChanges$(control) {
        return statusChanges$(control).pipe(operators.map(( /**
         * @return {?}
         */function () { return control.enabled; })), operators.skipWhile(initialValue(control.enabled)), operators.distinctUntilChanged());
    }
    /**
     * @param {?} control
     * @return {?}
     */
    function disabledChanges$(control) {
        return enabledChanges$(control).pipe(operators.map(( /**
         * @param {?} enabled
         * @return {?}
         */function (enabled) { return !enabled; })));
    }
    /**
     * @param {?} control
     * @return {?}
     */
    function pendingChanges$(control) {
        return statusChanges$(control).pipe(operators.map(( /**
         * @return {?}
         */function () { return control.pending; })), operators.skipWhile(initialValue(control.pending)), operators.distinctUntilChanged());
    }
    /**
     * @param {?} control
     * @return {?}
     */
    function validChanges$(control) {
        return statusChanges$(control).pipe(operators.map(( /**
         * @return {?}
         */function () { return control.valid; })), operators.skipWhile(initialValue(control.valid)), operators.distinctUntilChanged());
    }
    /**
     * @param {?} control
     * @return {?}
     */
    function invalidChanges$(control) {
        return statusChanges$(control).pipe(operators.map(( /**
         * @return {?}
         */function () { return control.invalid; })), operators.skipWhile(initialValue(control.invalid)), operators.distinctUntilChanged());
    }
    /**
     * @param {?} control
     * @return {?}
     */
    function valueChanges$(control) {
        return propertyChanges(control, 'value').pipe(operators.map(( /**
         * @return {?}
         */function () { return control.value; })), operators.skipWhile(initialValue(control.value)), operators.distinctUntilChanged());
    }
    /**
     * @param {?} control
     * @return {?}
     */
    function stateChanges$(control) {
        return rxjs.merge(pristineChanges$(control), touchedChanges$(control), statusChanges$(control), valueChanges$(control)).pipe(operators.map(( /**
         * @return {?}
         */function () {
            return ({
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
            });
        })));
    }
    // tslint:disable-next-line:no-shadowed-variable
    /**
     * @template T
     * @param {?} initialValue
     * @return {?}
     */
    function initialValue(initialValue) {
        return ( /**
         * @param {?} value
         * @return {?}
         */function (value) { return value === initialValue; });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.pristineChanges$ = pristineChanges$;
    exports.dirtyChanges$ = dirtyChanges$;
    exports.touchedChanges$ = touchedChanges$;
    exports.untouchedChanges$ = untouchedChanges$;
    exports.statusChanges$ = statusChanges$;
    exports.enabledChanges$ = enabledChanges$;
    exports.disabledChanges$ = disabledChanges$;
    exports.pendingChanges$ = pendingChanges$;
    exports.validChanges$ = validChanges$;
    exports.invalidChanges$ = invalidChanges$;
    exports.valueChanges$ = valueChanges$;
    exports.stateChanges$ = stateChanges$;
    exports.ɵa = propertyChanges;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=forms.umd.js.map