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
    function () { return control.pristine; })), skipWhile(initialValue(control.pristine)), distinctUntilChanged());
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
    function (pristine) { return !pristine; })));
}
/**
 * @param {?} control
 * @return {?}
 */
export function touchedChanges$(control) {
    return propertyChanges(control, 'touched').pipe(map((/**
     * @return {?}
     */
    function () { return control.touched; })), skipWhile(initialValue(control.touched)), distinctUntilChanged());
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
    function (touched) { return !touched; })));
}
/**
 * @param {?} control
 * @return {?}
 */
export function statusChanges$(control) {
    return propertyChanges(control, 'status').pipe(map((/**
     * @return {?}
     */
    function () { return control.status; })), skipWhile(initialValue(control.status)), distinctUntilChanged());
}
/**
 * @param {?} control
 * @return {?}
 */
export function enabledChanges$(control) {
    return statusChanges$(control).pipe(map((/**
     * @return {?}
     */
    function () { return control.enabled; })), skipWhile(initialValue(control.enabled)), distinctUntilChanged());
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
    function (enabled) { return !enabled; })));
}
/**
 * @param {?} control
 * @return {?}
 */
export function pendingChanges$(control) {
    return statusChanges$(control).pipe(map((/**
     * @return {?}
     */
    function () { return control.pending; })), skipWhile(initialValue(control.pending)), distinctUntilChanged());
}
/**
 * @param {?} control
 * @return {?}
 */
export function validChanges$(control) {
    return statusChanges$(control).pipe(map((/**
     * @return {?}
     */
    function () { return control.valid; })), skipWhile(initialValue(control.valid)), distinctUntilChanged());
}
/**
 * @param {?} control
 * @return {?}
 */
export function invalidChanges$(control) {
    return statusChanges$(control).pipe(map((/**
     * @return {?}
     */
    function () { return control.invalid; })), skipWhile(initialValue(control.invalid)), distinctUntilChanged());
}
/**
 * @param {?} control
 * @return {?}
 */
export function valueChanges$(control) {
    return propertyChanges(control, 'value').pipe(map((/**
     * @return {?}
     */
    function () { return control.value; })), skipWhile(initialValue(control.value)), distinctUntilChanged());
}
/**
 * @param {?} control
 * @return {?}
 */
export function stateChanges$(control) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1vYnNlcnZlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1idWNrZXQvZm9ybXMvIiwic291cmNlcyI6WyJpbnRlcm5hbC9mb3JtLW9ic2VydmVyL2Zvcm0tb2JzZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxLQUFLLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7O0FBRXJELE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxPQUF3QjtJQUN2RCxPQUFPLGVBQWUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUM5QyxHQUFHOzs7SUFBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLFFBQVEsRUFBaEIsQ0FBZ0IsRUFBQyxFQUMzQixTQUFTLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUN6QyxvQkFBb0IsRUFBRSxDQUN2QixDQUFDO0FBQ0osQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsYUFBYSxDQUFDLE9BQXdCO0lBQ3BELE9BQU8sZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUc7Ozs7SUFBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLENBQUMsUUFBUSxFQUFULENBQVMsRUFBQyxDQUFDLENBQUM7QUFDcEUsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsZUFBZSxDQUFDLE9BQXdCO0lBQ3RELE9BQU8sZUFBZSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQzdDLEdBQUc7OztJQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsT0FBTyxFQUFmLENBQWUsRUFBQyxFQUMxQixTQUFTLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FB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TyxDQUFDLEVBQ3pCLGVBQWUsQ0FBQyxPQUFPLENBQUMsRUFDeEIsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUN2QixhQUFhLENBQUMsT0FBTyxDQUFDLENBQ3ZCLENBQUMsSUFBSSxDQUFDLEdBQUc7OztJQUFDLGNBQU0sT0FBQSxDQUFDO1FBQ2hCLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUTtRQUMxQixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7UUFDcEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO1FBQ3hCLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUztRQUM1QixNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07UUFDdEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO1FBQ3hCLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUTtRQUMxQixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87UUFDeEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO1FBQ3BCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztRQUN4QixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7S0FDckIsQ0FBQyxFQVplLENBWWYsRUFBQyxDQUFDLENBQUM7QUFDUCxDQUFDOzs7Ozs7O0FBSUQsU0FBUyxZQUFZLENBQUksWUFBZTtJQUN0Qzs7OztJQUFPLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxLQUFLLFlBQVksRUFBdEIsQ0FBc0IsRUFBQztBQUN6QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBtZXJnZSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwLCBza2lwV2hpbGUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IEZvcm1PYnNlcnZlclN0YXRlRXZlbnQgfSBmcm9tICcuL2Zvcm0tb2JzZXJ2ZXItc3RhdGUtZXZlbnQnO1xyXG5pbXBvcnQgeyBwcm9wZXJ0eUNoYW5nZXMgfSBmcm9tICcuL3Byb3BlcnR5LWNoYW5nZXMnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHByaXN0aW5lQ2hhbmdlcyQoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XHJcbiAgcmV0dXJuIHByb3BlcnR5Q2hhbmdlcyhjb250cm9sLCAncHJpc3RpbmUnKS5waXBlKFxyXG4gICAgbWFwKCgpID0+IGNvbnRyb2wucHJpc3RpbmUpLFxyXG4gICAgc2tpcFdoaWxlKGluaXRpYWxWYWx1ZShjb250cm9sLnByaXN0aW5lKSksXHJcbiAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkaXJ0eUNoYW5nZXMkKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xyXG4gIHJldHVybiBwcmlzdGluZUNoYW5nZXMkKGNvbnRyb2wpLnBpcGUobWFwKHByaXN0aW5lID0+ICFwcmlzdGluZSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG91Y2hlZENoYW5nZXMkKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xyXG4gIHJldHVybiBwcm9wZXJ0eUNoYW5nZXMoY29udHJvbCwgJ3RvdWNoZWQnKS5waXBlKFxyXG4gICAgbWFwKCgpID0+IGNvbnRyb2wudG91Y2hlZCksXHJcbiAgICBza2lwV2hpbGUoaW5pdGlhbFZhbHVlKGNvbnRyb2wudG91Y2hlZCkpLFxyXG4gICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdW50b3VjaGVkQ2hhbmdlcyQoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XHJcbiAgcmV0dXJuIHRvdWNoZWRDaGFuZ2VzJChjb250cm9sKS5waXBlKG1hcCh0b3VjaGVkID0+ICF0b3VjaGVkKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzdGF0dXNDaGFuZ2VzJChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xyXG4gIHJldHVybiBwcm9wZXJ0eUNoYW5nZXMoY29udHJvbCwgJ3N0YXR1cycpLnBpcGUoXHJcbiAgICBtYXAoKCkgPT4gY29udHJvbC5zdGF0dXMpLFxyXG4gICAgc2tpcFdoaWxlKGluaXRpYWxWYWx1ZShjb250cm9sLnN0YXR1cykpLFxyXG4gICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlZENoYW5nZXMkKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xyXG4gIHJldHVybiBzdGF0dXNDaGFuZ2VzJChjb250cm9sKS5waXBlKFxyXG4gICAgbWFwKCgpID0+IGNvbnRyb2wuZW5hYmxlZCksXHJcbiAgICBza2lwV2hpbGUoaW5pdGlhbFZhbHVlKGNvbnRyb2wuZW5hYmxlZCkpLFxyXG4gICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGlzYWJsZWRDaGFuZ2VzJChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuICByZXR1cm4gZW5hYmxlZENoYW5nZXMkKGNvbnRyb2wpLnBpcGUobWFwKGVuYWJsZWQgPT4gIWVuYWJsZWQpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBlbmRpbmdDaGFuZ2VzJChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuICByZXR1cm4gc3RhdHVzQ2hhbmdlcyQoY29udHJvbCkucGlwZShcclxuICAgIG1hcCgoKSA9PiBjb250cm9sLnBlbmRpbmcpLFxyXG4gICAgc2tpcFdoaWxlKGluaXRpYWxWYWx1ZShjb250cm9sLnBlbmRpbmcpKSxcclxuICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkQ2hhbmdlcyQoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XHJcbiAgcmV0dXJuIHN0YXR1c0NoYW5nZXMkKGNvbnRyb2wpLnBpcGUoXHJcbiAgICBtYXAoKCkgPT4gY29udHJvbC52YWxpZCksXHJcbiAgICBza2lwV2hpbGUoaW5pdGlhbFZhbHVlKGNvbnRyb2wudmFsaWQpKSxcclxuICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGludmFsaWRDaGFuZ2VzJChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuICByZXR1cm4gc3RhdHVzQ2hhbmdlcyQoY29udHJvbCkucGlwZShcclxuICAgIG1hcCgoKSA9PiBjb250cm9sLmludmFsaWQpLFxyXG4gICAgc2tpcFdoaWxlKGluaXRpYWxWYWx1ZShjb250cm9sLmludmFsaWQpKSxcclxuICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZhbHVlQ2hhbmdlcyQoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICByZXR1cm4gcHJvcGVydHlDaGFuZ2VzKGNvbnRyb2wsICd2YWx1ZScpLnBpcGUoXHJcbiAgICBtYXAoKCkgPT4gY29udHJvbC52YWx1ZSksXHJcbiAgICBza2lwV2hpbGUoaW5pdGlhbFZhbHVlKGNvbnRyb2wudmFsdWUpKSxcclxuICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHN0YXRlQ2hhbmdlcyQoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogT2JzZXJ2YWJsZTxGb3JtT2JzZXJ2ZXJTdGF0ZUV2ZW50PiB7XHJcbiAgcmV0dXJuIG1lcmdlKFxyXG4gICAgcHJpc3RpbmVDaGFuZ2VzJChjb250cm9sKSxcclxuICAgIHRvdWNoZWRDaGFuZ2VzJChjb250cm9sKSxcclxuICAgIHN0YXR1c0NoYW5nZXMkKGNvbnRyb2wpLFxyXG4gICAgdmFsdWVDaGFuZ2VzJChjb250cm9sKSxcclxuICApLnBpcGUobWFwKCgpID0+ICh7XHJcbiAgICBwcmlzdGluZTogY29udHJvbC5wcmlzdGluZSxcclxuICAgIGRpcnR5OiBjb250cm9sLmRpcnR5LFxyXG4gICAgdG91Y2hlZDogY29udHJvbC50b3VjaGVkLFxyXG4gICAgdW50b3VjaGVkOiBjb250cm9sLnVudG91Y2hlZCxcclxuICAgIHN0YXR1czogY29udHJvbC5zdGF0dXMsXHJcbiAgICBlbmFibGVkOiBjb250cm9sLmVuYWJsZWQsXHJcbiAgICBkaXNhYmxlZDogY29udHJvbC5kaXNhYmxlZCxcclxuICAgIHBlbmRpbmc6IGNvbnRyb2wucGVuZGluZyxcclxuICAgIHZhbGlkOiBjb250cm9sLnZhbGlkLFxyXG4gICAgaW52YWxpZDogY29udHJvbC5pbnZhbGlkLFxyXG4gICAgdmFsdWU6IGNvbnRyb2wudmFsdWUsXHJcbiAgfSkpKTtcclxufVxyXG5cclxuXHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1zaGFkb3dlZC12YXJpYWJsZVxyXG5mdW5jdGlvbiBpbml0aWFsVmFsdWU8VD4oaW5pdGlhbFZhbHVlOiBUKTogKHY6IFQpID0+IGJvb2xlYW4ge1xyXG4gIHJldHVybiB2YWx1ZSA9PiB2YWx1ZSA9PT0gaW5pdGlhbFZhbHVlO1xyXG59XHJcbiJdfQ==