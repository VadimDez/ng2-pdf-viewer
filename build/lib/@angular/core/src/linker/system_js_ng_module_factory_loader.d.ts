import { Compiler } from './compiler';
import { NgModuleFactory } from './ng_module_factory';
import { NgModuleFactoryLoader } from './ng_module_factory_loader';
/**
 * NgModuleFactoryLoader that uses SystemJS to load NgModuleFactory
 * @experimental
 */
export declare class SystemJsNgModuleLoader implements NgModuleFactoryLoader {
    private _compiler;
    constructor(_compiler: Compiler);
    load(path: string): Promise<NgModuleFactory<any>>;
    private loadAndCompile(path);
    private loadFactory(path);
}
