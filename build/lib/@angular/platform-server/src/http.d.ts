import { Provider } from '@angular/core';
import { BrowserXhr, Connection, ConnectionBackend, Http, ReadyState, Request, RequestOptions, Response, XHRBackend, XSRFStrategy } from '@angular/http';
import { Observable } from 'rxjs/Observable';
export declare class ServerXhr implements BrowserXhr {
    build(): XMLHttpRequest;
}
export declare class ServerXsrfStrategy implements XSRFStrategy {
    configureRequest(req: Request): void;
}
export declare class ZoneMacroTaskConnection implements Connection {
    request: Request;
    response: Observable<Response>;
    lastConnection: Connection;
    constructor(request: Request, backend: XHRBackend);
    readonly readyState: ReadyState;
}
export declare class ZoneMacroTaskBackend implements ConnectionBackend {
    private backend;
    constructor(backend: XHRBackend);
    createConnection(request: any): ZoneMacroTaskConnection;
}
export declare function httpFactory(xhrBackend: XHRBackend, options: RequestOptions): Http;
export declare const SERVER_HTTP_PROVIDERS: Provider[];
