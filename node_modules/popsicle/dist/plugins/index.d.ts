import Promise = require('any-promise');
export * from './common';
import Request, { Middleware } from '../request';
import Response from '../response';
export declare const unzip: () => (request: Request, next: () => Promise<Response>) => Promise<Response>;
export declare function concatStream(encoding: string): (request: Request, next: () => Promise<Response>) => Promise<{}>;
export declare function headers(): (request: Request, next: () => Promise<Response>) => Promise<Response>;
export declare const defaults: Middleware[];
