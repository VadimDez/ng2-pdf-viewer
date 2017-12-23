import { Observable } from 'rxjs/Observable';
import { ReadyState } from '../enums';
import { Connection, ConnectionBackend } from '../interfaces';
import { Request } from '../static_request';
import { Response } from '../static_response';
/**
 * Base class for an in-flight JSONP request.
 *
 * @deprecated use @angular/common/http instead
 */
export declare class JSONPConnection implements Connection {
    private _dom;
    private baseResponseOptions;
    private _id;
    private _script;
    private _responseData;
    private _finished;
    /**
     * The {@link ReadyState} of this request.
     */
    readyState: ReadyState;
    /**
     * The outgoing HTTP request.
     */
    request: Request;
    /**
     * An observable that completes with the response, when the request is finished.
     */
    response: Observable<Response>;
    /**
     * Callback called when the JSONP request completes, to notify the application
     * of the new data.
     */
    finished(data?: any): void;
}
/**
 * A {@link ConnectionBackend} that uses the JSONP strategy of making requests.
 *
 * @deprecated use @angular/common/http instead
 */
export declare class JSONPBackend extends ConnectionBackend {
    private _browserJSONP;
    private _baseResponseOptions;
    createConnection(request: Request): JSONPConnection;
}
