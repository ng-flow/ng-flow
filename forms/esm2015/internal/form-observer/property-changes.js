/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
/**
 * @template T, K
 * @param {?} obj
 * @param {?} prop
 * @return {?}
 */
export function propertyChanges(obj, prop) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHktY2hhbmdlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1idWNrZXQvZm9ybXMvIiwic291cmNlcyI6WyJpbnRlcm5hbC9mb3JtLW9ic2VydmVyL3Byb3BlcnR5LWNoYW5nZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7Ozs7QUFFM0MsTUFBTSxVQUFVLGVBQWUsQ0FBc0MsR0FBTSxFQUFFLElBQU87O1VBQzVFLGdCQUFnQixHQUFHLG1CQUFtQixDQUFDLEdBQUcsQ0FBQztJQUVqRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUU7O2NBQ3JCLE9BQU8sR0FBRyxJQUFJLE9BQU8sRUFBUTtRQUNuQyxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUk7Ozs7UUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsQ0FBQztRQUN4RCxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDakQ7SUFFRCxPQUFPLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hDLENBQUM7Ozs7OztBQUVELFNBQVMsbUJBQW1CLENBQW1CLEdBQU07O1VBQzdDLHFCQUFxQixHQUFHLFdBQVc7SUFFekMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO1FBQy9CLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLHFCQUFxQixFQUFFLEVBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQztLQUNuRjtJQUVELE9BQU8sR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDcEMsQ0FBQzs7Ozs7Ozs7QUFFRCxTQUFTLFFBQVEsQ0FBc0MsR0FBTSxFQUFFLElBQU8sRUFBRSxRQUErQjs7VUFDL0YsVUFBVSxHQUFHLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7O1VBQ3hDLE1BQU0sR0FBRyxVQUFVLENBQUMsR0FBRztJQUM3QixVQUFVLENBQUMsR0FBRzs7O0lBQUc7UUFDZixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNoQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekIsQ0FBQyxDQUFBLENBQUM7SUFFRixNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDL0MsQ0FBQzs7Ozs7OztBQUVELFNBQVMsZ0JBQWdCLENBQXNDLEdBQU0sRUFBRSxJQUFPOztRQUN4RSxVQUFVLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7SUFFM0QsSUFBSSxVQUFVLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLFVBQVUsQ0FBQyxRQUFRLEVBQUU7O1lBQ3pELEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSztRQUM1QixVQUFVLHFCQUFPLFVBQVUsQ0FBQyxDQUFDO1FBRTdCLFVBQVUsQ0FBQyxHQUFHOzs7O1FBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFBLENBQUM7UUFDaEMsVUFBVSxDQUFDLEdBQUc7OztRQUFHLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQSxDQUFDO1FBRTdCLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQztRQUN4QixPQUFPLFVBQVUsQ0FBQyxRQUFRLENBQUM7S0FDNUI7SUFFRCxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHByb3BlcnR5Q2hhbmdlczxUIGV4dGVuZHMgb2JqZWN0LCBLIGV4dGVuZHMga2V5b2YgVD4ob2JqOiBULCBwcm9wOiBLKTogT2JzZXJ2YWJsZTxUW0tdPiB7XHJcbiAgY29uc3QgcHJvcGVydHlPYnNlcnZlciA9IGdldFByb3BlcnR5T2JzZXJ2ZXIob2JqKTtcclxuXHJcbiAgaWYgKCFwcm9wZXJ0eU9ic2VydmVyW3Byb3BdKSB7XHJcbiAgICBjb25zdCBzdWJqZWN0ID0gbmV3IFN1YmplY3Q8VFtLXT4oKTtcclxuICAgIG9uQ2hhbmdlKG9iaiwgcHJvcCwgbmV3VmFsdWUgPT4gc3ViamVjdC5uZXh0KG5ld1ZhbHVlKSk7XHJcbiAgICBwcm9wZXJ0eU9ic2VydmVyW3Byb3BdID0gc3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBwcm9wZXJ0eU9ic2VydmVyW3Byb3BdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRQcm9wZXJ0eU9ic2VydmVyPFQgZXh0ZW5kcyBvYmplY3Q+KG9iajogVCk6IHsgW0sgaW4ga2V5b2YgVF0/OiBPYnNlcnZhYmxlPFRbS10+IH0ge1xyXG4gIGNvbnN0IFBST1BFUlRZX09CU0VSVkVSX0tFWSA9ICduZy1idWNrZXQnO1xyXG5cclxuICBpZiAoIW9ialtQUk9QRVJUWV9PQlNFUlZFUl9LRVldKSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBQUk9QRVJUWV9PQlNFUlZFUl9LRVksIHtlbnVtZXJhYmxlOiBmYWxzZSwgdmFsdWU6IHt9fSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gb2JqW1BST1BFUlRZX09CU0VSVkVSX0tFWV07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uQ2hhbmdlPFQgZXh0ZW5kcyBvYmplY3QsIEsgZXh0ZW5kcyBrZXlvZiBUPihvYmo6IFQsIHByb3A6IEssIGNhbGxiYWNrOiAodmFsdWU6IFRbS10pID0+IHZvaWQpIHtcclxuICBjb25zdCBkZXNjcmlwdG9yID0gY3JlYXRlRGVzY3JpcHRvcihvYmosIHByb3ApO1xyXG4gIGNvbnN0IHNldHRlciA9IGRlc2NyaXB0b3Iuc2V0O1xyXG4gIGRlc2NyaXB0b3Iuc2V0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICBzZXR0ZXIuYXBwbHkoc2V0dGVyLCBhcmd1bWVudHMpO1xyXG4gICAgY2FsbGJhY2soYXJndW1lbnRzWzBdKTtcclxuICB9O1xyXG5cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBwcm9wLCBkZXNjcmlwdG9yKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRGVzY3JpcHRvcjxUIGV4dGVuZHMgb2JqZWN0LCBLIGV4dGVuZHMga2V5b2YgVD4ob2JqOiBULCBwcm9wOiBLKTogUHJvcGVydHlEZXNjcmlwdG9yIHtcclxuICBsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBwcm9wKTtcclxuXHJcbiAgaWYgKGRlc2NyaXB0b3IuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykgJiYgZGVzY3JpcHRvci53cml0YWJsZSkge1xyXG4gICAgbGV0IHZhbHVlID0gZGVzY3JpcHRvci52YWx1ZTtcclxuICAgIGRlc2NyaXB0b3IgPSB7Li4uZGVzY3JpcHRvcn07XHJcblxyXG4gICAgZGVzY3JpcHRvci5zZXQgPSB2ID0+IHZhbHVlID0gdjtcclxuICAgIGRlc2NyaXB0b3IuZ2V0ID0gKCkgPT4gdmFsdWU7XHJcblxyXG4gICAgZGVsZXRlIGRlc2NyaXB0b3IudmFsdWU7XHJcbiAgICBkZWxldGUgZGVzY3JpcHRvci53cml0YWJsZTtcclxuICB9XHJcblxyXG4gIHJldHVybiBkZXNjcmlwdG9yO1xyXG59XHJcbiJdfQ==