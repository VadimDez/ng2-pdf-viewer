import { distinctKey } from '../../operator/distinctKey';
declare module '../../Observable' {
    interface Observable<T> {
        distinctKey: typeof distinctKey;
    }
}
