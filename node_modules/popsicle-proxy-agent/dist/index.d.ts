import { Request } from 'popsicle';
declare function proxy(options?: proxy.Options): (request: Request, next: () => any) => any;
declare namespace proxy {
    interface Options {
        proxy?: string;
        httpProxy?: string;
        httpsProxy?: string;
        noProxy?: string;
    }
}
export = proxy;
