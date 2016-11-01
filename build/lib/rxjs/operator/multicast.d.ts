import { Subject } from '../Subject';
import { Operator } from '../Operator';
import { Subscriber } from '../Subscriber';
import { Observable } from '../Observable';
import { ConnectableObservable } from '../observable/ConnectableObservable';
/**
 * Returns an Observable that emits the results of invoking a specified selector on items
 * emitted by a ConnectableObservable that shares a single subscription to the underlying stream.
 *
 * <img src="./img/multicast.png" width="100%">
 *
 * @param {Function|Subject} Factory function to create an intermediate subject through
 * which the source sequence's elements will be multicast to the selector function
 * or Subject to push source elements into.
 * @param {Function} Optional selector function that can use the multicasted source stream
 * as many times as needed, without causing multiple subscriptions to the source stream.
 * Subscribers to the given source will receive all notifications of the source from the
 * time of the subscription forward.
 * @return {Observable} an Observable that emits the results of invoking the selector
 * on the items emitted by a `ConnectableObservable` that shares a single subscription to
 * the underlying stream.
 * @method multicast
 * @owner Observable
 */
export declare function multicast<T>(this: Observable<T>, subjectOrSubjectFactory: factoryOrValue<Subject<T>>): ConnectableObservable<T>;
export declare function multicast<T>(SubjectFactory: (this: Observable<T>) => Subject<T>, selector?: selector<T>): Observable<T>;
export declare type factoryOrValue<T> = T | (() => T);
export declare type selector<T> = (source: Observable<T>) => Observable<T>;
export declare class MulticastOperator<T> implements Operator<T, T> {
    private subjectFactory;
    private selector;
    constructor(subjectFactory: () => Subject<T>, selector: (source: Observable<T>) => Observable<T>);
    call(subscriber: Subscriber<T>, self: any): any;
}
