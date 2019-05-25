/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { merge } from 'rxjs';
import { distinctUntilChanged, map, skipWhile } from 'rxjs/operators';
import { propertyChanges } from './property-changes';
/**
 * @param {?} control
 * @return {?}
 */
export function pristineChanges$(control) {
    return propertyChanges(control, 'pristine').pipe(map((/**
     * @return {?}
     */
    () => control.pristine)), skipWhile(initialValue(control.pristine)), distinctUntilChanged());
}
/**
 * @param {?} control
 * @return {?}
 */
export function dirtyChanges$(control) {
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
export function touchedChanges$(control) {
    return propertyChanges(control, 'touched').pipe(map((/**
     * @return {?}
     */
    () => control.touched)), skipWhile(initialValue(control.touched)), distinctUntilChanged());
}
/**
 * @param {?} control
 * @return {?}
 */
export function untouchedChanges$(control) {
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
export function statusChanges$(control) {
    return propertyChanges(control, 'status').pipe(map((/**
     * @return {?}
     */
    () => control.status)), skipWhile(initialValue(control.status)), distinctUntilChanged());
}
/**
 * @param {?} control
 * @return {?}
 */
export function enabledChanges$(control) {
    return statusChanges$(control).pipe(map((/**
     * @return {?}
     */
    () => control.enabled)), skipWhile(initialValue(control.enabled)), distinctUntilChanged());
}
/**
 * @param {?} control
 * @return {?}
 */
export function disabledChanges$(control) {
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
export function pendingChanges$(control) {
    return statusChanges$(control).pipe(map((/**
     * @return {?}
     */
    () => control.pending)), skipWhile(initialValue(control.pending)), distinctUntilChanged());
}
/**
 * @param {?} control
 * @return {?}
 */
export function validChanges$(control) {
    return statusChanges$(control).pipe(map((/**
     * @return {?}
     */
    () => control.valid)), skipWhile(initialValue(control.valid)), distinctUntilChanged());
}
/**
 * @param {?} control
 * @return {?}
 */
export function invalidChanges$(control) {
    return statusChanges$(control).pipe(map((/**
     * @return {?}
     */
    () => control.invalid)), skipWhile(initialValue(control.invalid)), distinctUntilChanged());
}
/**
 * @param {?} control
 * @return {?}
 */
export function valueChanges$(control) {
    return propertyChanges(control, 'value').pipe(map((/**
     * @return {?}
     */
    () => control.value)), skipWhile(initialValue(control.value)), distinctUntilChanged());
}
/**
 * @param {?} control
 * @return {?}
 */
export function stateChanges$(control) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1vYnNlcnZlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1idWNrZXQvZm9ybXMvIiwic291cmNlcyI6WyJpbnRlcm5hbC9mb3JtLW9ic2VydmVyL2Zvcm0tb2JzZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxLQUFLLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7O0FBRXJELE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxPQUF3QjtJQUN2RCxPQUFPLGVBQWUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUM5QyxHQUFHOzs7SUFBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFDLEVBQzNCLFNBQVMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQ3pDLG9CQUFvQixFQUFFLENBQ3ZCLENBQUM7QUFDSixDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxhQUFhLENBQUMsT0FBd0I7SUFDcEQsT0FBTyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRzs7OztJQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDO0FBQ3BFLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLGVBQWUsQ0FBQyxPQUF3QjtJQUN0RCxPQUFPLGVBQWUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUM3QyxHQUFHOzs7SUFBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFDLEVBQzFCLFNBQVMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQ3hDLG9CQUFvQixFQUFFLENB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QUMsT0FBTyxDQUFDLENBQ3ZCLENBQUMsSUFBSSxDQUFDLEdBQUc7OztJQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDaEIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO1FBQzFCLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztRQUNwQixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87UUFDeEIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTO1FBQzVCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtRQUN0QixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87UUFDeEIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO1FBQzFCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztRQUN4QixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7UUFDcEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO1FBQ3hCLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztLQUNyQixDQUFDLEVBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQzs7Ozs7OztBQUlELFNBQVMsWUFBWSxDQUFJLFlBQWU7SUFDdEM7Ozs7SUFBTyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssS0FBSyxZQUFZLEVBQUM7QUFDekMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgbWVyZ2UsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCwgc2tpcFdoaWxlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBGb3JtT2JzZXJ2ZXJTdGF0ZUV2ZW50IH0gZnJvbSAnLi9mb3JtLW9ic2VydmVyLXN0YXRlLWV2ZW50JztcclxuaW1wb3J0IHsgcHJvcGVydHlDaGFuZ2VzIH0gZnJvbSAnLi9wcm9wZXJ0eS1jaGFuZ2VzJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwcmlzdGluZUNoYW5nZXMkKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xyXG4gIHJldHVybiBwcm9wZXJ0eUNoYW5nZXMoY29udHJvbCwgJ3ByaXN0aW5lJykucGlwZShcclxuICAgIG1hcCgoKSA9PiBjb250cm9sLnByaXN0aW5lKSxcclxuICAgIHNraXBXaGlsZShpbml0aWFsVmFsdWUoY29udHJvbC5wcmlzdGluZSkpLFxyXG4gICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGlydHlDaGFuZ2VzJChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuICByZXR1cm4gcHJpc3RpbmVDaGFuZ2VzJChjb250cm9sKS5waXBlKG1hcChwcmlzdGluZSA9PiAhcHJpc3RpbmUpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvdWNoZWRDaGFuZ2VzJChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuICByZXR1cm4gcHJvcGVydHlDaGFuZ2VzKGNvbnRyb2wsICd0b3VjaGVkJykucGlwZShcclxuICAgIG1hcCgoKSA9PiBjb250cm9sLnRvdWNoZWQpLFxyXG4gICAgc2tpcFdoaWxlKGluaXRpYWxWYWx1ZShjb250cm9sLnRvdWNoZWQpKSxcclxuICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVudG91Y2hlZENoYW5nZXMkKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xyXG4gIHJldHVybiB0b3VjaGVkQ2hhbmdlcyQoY29udHJvbCkucGlwZShtYXAodG91Y2hlZCA9PiAhdG91Y2hlZCkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3RhdHVzQ2hhbmdlcyQoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcclxuICByZXR1cm4gcHJvcGVydHlDaGFuZ2VzKGNvbnRyb2wsICdzdGF0dXMnKS5waXBlKFxyXG4gICAgbWFwKCgpID0+IGNvbnRyb2wuc3RhdHVzKSxcclxuICAgIHNraXBXaGlsZShpbml0aWFsVmFsdWUoY29udHJvbC5zdGF0dXMpKSxcclxuICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZWRDaGFuZ2VzJChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuICByZXR1cm4gc3RhdHVzQ2hhbmdlcyQoY29udHJvbCkucGlwZShcclxuICAgIG1hcCgoKSA9PiBjb250cm9sLmVuYWJsZWQpLFxyXG4gICAgc2tpcFdoaWxlKGluaXRpYWxWYWx1ZShjb250cm9sLmVuYWJsZWQpKSxcclxuICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGVkQ2hhbmdlcyQoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XHJcbiAgcmV0dXJuIGVuYWJsZWRDaGFuZ2VzJChjb250cm9sKS5waXBlKG1hcChlbmFibGVkID0+ICFlbmFibGVkKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwZW5kaW5nQ2hhbmdlcyQoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XHJcbiAgcmV0dXJuIHN0YXR1c0NoYW5nZXMkKGNvbnRyb2wpLnBpcGUoXHJcbiAgICBtYXAoKCkgPT4gY29udHJvbC5wZW5kaW5nKSxcclxuICAgIHNraXBXaGlsZShpbml0aWFsVmFsdWUoY29udHJvbC5wZW5kaW5nKSksXHJcbiAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB2YWxpZENoYW5nZXMkKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xyXG4gIHJldHVybiBzdGF0dXNDaGFuZ2VzJChjb250cm9sKS5waXBlKFxyXG4gICAgbWFwKCgpID0+IGNvbnRyb2wudmFsaWQpLFxyXG4gICAgc2tpcFdoaWxlKGluaXRpYWxWYWx1ZShjb250cm9sLnZhbGlkKSksXHJcbiAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnZhbGlkQ2hhbmdlcyQoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XHJcbiAgcmV0dXJuIHN0YXR1c0NoYW5nZXMkKGNvbnRyb2wpLnBpcGUoXHJcbiAgICBtYXAoKCkgPT4gY29udHJvbC5pbnZhbGlkKSxcclxuICAgIHNraXBXaGlsZShpbml0aWFsVmFsdWUoY29udHJvbC5pbnZhbGlkKSksXHJcbiAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB2YWx1ZUNoYW5nZXMkKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgcmV0dXJuIHByb3BlcnR5Q2hhbmdlcyhjb250cm9sLCAndmFsdWUnKS5waXBlKFxyXG4gICAgbWFwKCgpID0+IGNvbnRyb2wudmFsdWUpLFxyXG4gICAgc2tpcFdoaWxlKGluaXRpYWxWYWx1ZShjb250cm9sLnZhbHVlKSksXHJcbiAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzdGF0ZUNoYW5nZXMkKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IE9ic2VydmFibGU8Rm9ybU9ic2VydmVyU3RhdGVFdmVudD4ge1xyXG4gIHJldHVybiBtZXJnZShcclxuICAgIHByaXN0aW5lQ2hhbmdlcyQoY29udHJvbCksXHJcbiAgICB0b3VjaGVkQ2hhbmdlcyQoY29udHJvbCksXHJcbiAgICBzdGF0dXNDaGFuZ2VzJChjb250cm9sKSxcclxuICAgIHZhbHVlQ2hhbmdlcyQoY29udHJvbCksXHJcbiAgKS5waXBlKG1hcCgoKSA9PiAoe1xyXG4gICAgcHJpc3RpbmU6IGNvbnRyb2wucHJpc3RpbmUsXHJcbiAgICBkaXJ0eTogY29udHJvbC5kaXJ0eSxcclxuICAgIHRvdWNoZWQ6IGNvbnRyb2wudG91Y2hlZCxcclxuICAgIHVudG91Y2hlZDogY29udHJvbC51bnRvdWNoZWQsXHJcbiAgICBzdGF0dXM6IGNvbnRyb2wuc3RhdHVzLFxyXG4gICAgZW5hYmxlZDogY29udHJvbC5lbmFibGVkLFxyXG4gICAgZGlzYWJsZWQ6IGNvbnRyb2wuZGlzYWJsZWQsXHJcbiAgICBwZW5kaW5nOiBjb250cm9sLnBlbmRpbmcsXHJcbiAgICB2YWxpZDogY29udHJvbC52YWxpZCxcclxuICAgIGludmFsaWQ6IGNvbnRyb2wuaW52YWxpZCxcclxuICAgIHZhbHVlOiBjb250cm9sLnZhbHVlLFxyXG4gIH0pKSk7XHJcbn1cclxuXHJcblxyXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tc2hhZG93ZWQtdmFyaWFibGVcclxuZnVuY3Rpb24gaW5pdGlhbFZhbHVlPFQ+KGluaXRpYWxWYWx1ZTogVCk6ICh2OiBUKSA9PiBib29sZWFuIHtcclxuICByZXR1cm4gdmFsdWUgPT4gdmFsdWUgPT09IGluaXRpYWxWYWx1ZTtcclxufVxyXG4iXX0=