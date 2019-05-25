/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Subject } from 'rxjs';
/**
 * @template T, K
 * @param {?} obj
 * @param {?} prop
 * @return {?}
 */
export function propertyChanges(obj, prop) {
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
        descriptor = tslib_1.__assign({}, descriptor);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHktY2hhbmdlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1idWNrZXQvZm9ybXMvIiwic291cmNlcyI6WyJpbnRlcm5hbC9mb3JtLW9ic2VydmVyL3Byb3BlcnR5LWNoYW5nZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7Ozs7O0FBRTNDLE1BQU0sVUFBVSxlQUFlLENBQXNDLEdBQU0sRUFBRSxJQUFPOztRQUM1RSxnQkFBZ0IsR0FBRyxtQkFBbUIsQ0FBQyxHQUFHLENBQUM7SUFFakQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFOztZQUNyQixTQUFPLEdBQUcsSUFBSSxPQUFPLEVBQVE7UUFDbkMsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJOzs7O1FBQUUsVUFBQSxRQUFRLElBQUksT0FBQSxTQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUF0QixDQUFzQixFQUFDLENBQUM7UUFDeEQsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ2pEO0lBRUQsT0FBTyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoQyxDQUFDOzs7Ozs7QUFFRCxTQUFTLG1CQUFtQixDQUFtQixHQUFNOztRQUM3QyxxQkFBcUIsR0FBRyxXQUFXO0lBRXpDLElBQUksQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsRUFBRTtRQUMvQixNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxxQkFBcUIsRUFBRSxFQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBQyxDQUFDLENBQUM7S0FDbkY7SUFFRCxPQUFPLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ3BDLENBQUM7Ozs7Ozs7O0FBRUQsU0FBUyxRQUFRLENBQXNDLEdBQU0sRUFBRSxJQUFPLEVBQUUsUUFBK0I7O1FBQy9GLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDOztRQUN4QyxNQUFNLEdBQUcsVUFBVSxDQUFDLEdBQUc7SUFDN0IsVUFBVSxDQUFDLEdBQUc7OztJQUFHO1FBQ2YsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDaEMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pCLENBQUMsQ0FBQSxDQUFDO0lBRUYsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQy9DLENBQUM7Ozs7Ozs7QUFFRCxTQUFTLGdCQUFnQixDQUFzQyxHQUFNLEVBQUUsSUFBTzs7UUFDeEUsVUFBVSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDO0lBRTNELElBQUksVUFBVSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxVQUFVLENBQUMsUUFBUSxFQUFFOztZQUN6RCxPQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUs7UUFDNUIsVUFBVSx3QkFBTyxVQUFVLENBQUMsQ0FBQztRQUU3QixVQUFVLENBQUMsR0FBRzs7OztRQUFHLFVBQUEsQ0FBQyxJQUFJLE9BQUEsT0FBSyxHQUFHLENBQUMsRUFBVCxDQUFTLENBQUEsQ0FBQztRQUNoQyxVQUFVLENBQUMsR0FBRzs7O1FBQUcsY0FBTSxPQUFBLE9BQUssRUFBTCxDQUFLLENBQUEsQ0FBQztRQUU3QixPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDeEIsT0FBTyxVQUFVLENBQUMsUUFBUSxDQUFDO0tBQzVCO0lBRUQsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0eUNoYW5nZXM8VCBleHRlbmRzIG9iamVjdCwgSyBleHRlbmRzIGtleW9mIFQ+KG9iajogVCwgcHJvcDogSyk6IE9ic2VydmFibGU8VFtLXT4ge1xyXG4gIGNvbnN0IHByb3BlcnR5T2JzZXJ2ZXIgPSBnZXRQcm9wZXJ0eU9ic2VydmVyKG9iaik7XHJcblxyXG4gIGlmICghcHJvcGVydHlPYnNlcnZlcltwcm9wXSkge1xyXG4gICAgY29uc3Qgc3ViamVjdCA9IG5ldyBTdWJqZWN0PFRbS10+KCk7XHJcbiAgICBvbkNoYW5nZShvYmosIHByb3AsIG5ld1ZhbHVlID0+IHN1YmplY3QubmV4dChuZXdWYWx1ZSkpO1xyXG4gICAgcHJvcGVydHlPYnNlcnZlcltwcm9wXSA9IHN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcHJvcGVydHlPYnNlcnZlcltwcm9wXTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0UHJvcGVydHlPYnNlcnZlcjxUIGV4dGVuZHMgb2JqZWN0PihvYmo6IFQpOiB7IFtLIGluIGtleW9mIFRdPzogT2JzZXJ2YWJsZTxUW0tdPiB9IHtcclxuICBjb25zdCBQUk9QRVJUWV9PQlNFUlZFUl9LRVkgPSAnbmctYnVja2V0JztcclxuXHJcbiAgaWYgKCFvYmpbUFJPUEVSVFlfT0JTRVJWRVJfS0VZXSkge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgUFJPUEVSVFlfT0JTRVJWRVJfS0VZLCB7ZW51bWVyYWJsZTogZmFsc2UsIHZhbHVlOiB7fX0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG9ialtQUk9QRVJUWV9PQlNFUlZFUl9LRVldO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvbkNoYW5nZTxUIGV4dGVuZHMgb2JqZWN0LCBLIGV4dGVuZHMga2V5b2YgVD4ob2JqOiBULCBwcm9wOiBLLCBjYWxsYmFjazogKHZhbHVlOiBUW0tdKSA9PiB2b2lkKSB7XHJcbiAgY29uc3QgZGVzY3JpcHRvciA9IGNyZWF0ZURlc2NyaXB0b3Iob2JqLCBwcm9wKTtcclxuICBjb25zdCBzZXR0ZXIgPSBkZXNjcmlwdG9yLnNldDtcclxuICBkZXNjcmlwdG9yLnNldCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgc2V0dGVyLmFwcGx5KHNldHRlciwgYXJndW1lbnRzKTtcclxuICAgIGNhbGxiYWNrKGFyZ3VtZW50c1swXSk7XHJcbiAgfTtcclxuXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgcHJvcCwgZGVzY3JpcHRvcik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZURlc2NyaXB0b3I8VCBleHRlbmRzIG9iamVjdCwgSyBleHRlbmRzIGtleW9mIFQ+KG9iajogVCwgcHJvcDogSyk6IFByb3BlcnR5RGVzY3JpcHRvciB7XHJcbiAgbGV0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgcHJvcCk7XHJcblxyXG4gIGlmIChkZXNjcmlwdG9yLmhhc093blByb3BlcnR5KCd2YWx1ZScpICYmIGRlc2NyaXB0b3Iud3JpdGFibGUpIHtcclxuICAgIGxldCB2YWx1ZSA9IGRlc2NyaXB0b3IudmFsdWU7XHJcbiAgICBkZXNjcmlwdG9yID0gey4uLmRlc2NyaXB0b3J9O1xyXG5cclxuICAgIGRlc2NyaXB0b3Iuc2V0ID0gdiA9PiB2YWx1ZSA9IHY7XHJcbiAgICBkZXNjcmlwdG9yLmdldCA9ICgpID0+IHZhbHVlO1xyXG5cclxuICAgIGRlbGV0ZSBkZXNjcmlwdG9yLnZhbHVlO1xyXG4gICAgZGVsZXRlIGRlc2NyaXB0b3Iud3JpdGFibGU7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZGVzY3JpcHRvcjtcclxufVxyXG4iXX0=