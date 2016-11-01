import { Observable } from '../Observable';
/**
 * @param PromiseCtor
 * @return {Promise<T>}
 * @method toPromise
 * @owner Observable
 */
export declare function toPromise<T>(this: Observable<T>): Promise<T>;
export declare function toPromise<T>(this: Observable<T>, PromiseCtor: typeof Promise): Promise<T>;
