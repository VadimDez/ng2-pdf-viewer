import Promise = require('any-promise');
import Base, { BaseOptions, Headers } from './base';
import Response, { ResponseOptions } from './response';
import PopsicleError from './error';
export interface DefaultsOptions extends BaseOptions {
    url?: string;
    method?: string;
    timeout?: number;
    body?: any;
    options?: any;
    use?: Middleware[];
    progress?: ProgressFunction[];
    transport?: TransportOptions;
}
export interface RequestOptions extends DefaultsOptions {
    url: string;
}
export interface RequestJSON {
    url: string;
    headers: Headers;
    body: any;
    timeout: number;
    options: any;
    method: string;
}
export interface TransportOptions {
    open: OpenHandler;
    abort?: AbortHandler;
    use?: Middleware[];
}
export declare type Middleware = (request: Request, next: () => Promise<Response>) => Response | Promise<Response>;
export declare type ProgressFunction = (request: Request) => any;
export declare type OpenHandler = (request: Request) => Promise<ResponseOptions>;
export declare type AbortHandler = (request: Request) => any;
export default class Request extends Base implements Promise<Response> {
    method: string;
    timeout: number;
    body: any;
    options: any;
    transport: TransportOptions;
    middleware: Middleware[];
    opened: boolean;
    aborted: boolean;
    uploadLength: number;
    downloadLength: number;
    private _uploadedBytes;
    private _downloadedBytes;
    _raw: any;
    _progress: ProgressFunction[];
    private _promise;
    private _resolve;
    private _reject;
    constructor(options: RequestOptions);
    error(message: string, code: string, original?: Error): PopsicleError;
    then(onFulfilled: (response?: Response) => any, onRejected?: (error?: PopsicleError) => any): Promise<any>;
    catch(onRejected: (error?: PopsicleError) => any): Promise<any>;
    exec(cb: (err: PopsicleError, response?: Response) => any): void;
    toOptions(): RequestOptions;
    toJSON(): RequestJSON;
    clone(): Request;
    use(fns: Middleware | Middleware[]): this;
    progress(fns: ProgressFunction | ProgressFunction[]): this;
    abort(): this;
    private _emit();
    private _handle();
    uploaded: number;
    downloaded: number;
    completed: number;
    completedBytes: number;
    totalBytes: number;
    uploadedBytes: number;
    downloadedBytes: number;
}
