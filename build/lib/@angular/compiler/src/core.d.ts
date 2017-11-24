/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export interface Inject {
    token: any;
}
export declare const createInject: MetadataFactory<Inject>;
export declare const createInjectionToken: MetadataFactory<object>;
export interface Attribute {
    attributeName?: string;
}
export declare const createAttribute: MetadataFactory<Attribute>;
export interface Query {
    descendants: boolean;
    first: boolean;
    read: any;
    isViewQuery: boolean;
    selector: any;
}
export declare const createContentChildren: MetadataFactory<Query>;
export declare const createContentChild: MetadataFactory<Query>;
export declare const createViewChildren: MetadataFactory<Query>;
export declare const createViewChild: MetadataFactory<Query>;
export interface Directive {
    selector?: string;
    inputs?: string[];
    outputs?: string[];
    host?: {
        [key: string]: string;
    };
    providers?: Provider[];
    exportAs?: string;
    queries?: {
        [key: string]: any;
    };
}
export declare const createDirective: MetadataFactory<Directive>;
export interface Component extends Directive {
    changeDetection?: ChangeDetectionStrategy;
    viewProviders?: Provider[];
    moduleId?: string;
    templateUrl?: string;
    template?: string;
    styleUrls?: string[];
    styles?: string[];
    animations?: any[];
    encapsulation?: ViewEncapsulation;
    interpolation?: [string, string];
    entryComponents?: Array<Type | any[]>;
    preserveWhitespaces?: boolean;
}
export declare enum ViewEncapsulation {
    Emulated = 0,
    Native = 1,
    None = 2,
}
export declare enum ChangeDetectionStrategy {
    OnPush = 0,
    Default = 1,
}
export declare const createComponent: MetadataFactory<Component>;
export interface Pipe {
    name: string;
    pure?: boolean;
}
export declare const createPipe: MetadataFactory<Pipe>;
export interface Input {
    bindingPropertyName?: string;
}
export declare const createInput: MetadataFactory<Input>;
export interface Output {
    bindingPropertyName?: string;
}
export declare const createOutput: MetadataFactory<Output>;
export interface HostBinding {
    hostPropertyName?: string;
}
export declare const createHostBinding: MetadataFactory<HostBinding>;
export interface HostListener {
    eventName?: string;
    args?: string[];
}
export declare const createHostListener: MetadataFactory<HostListener>;
export interface NgModule {
    providers?: Provider[];
    declarations?: Array<Type | any[]>;
    imports?: Array<Type | ModuleWithProviders | any[]>;
    exports?: Array<Type | any[]>;
    entryComponents?: Array<Type | any[]>;
    bootstrap?: Array<Type | any[]>;
    schemas?: Array<SchemaMetadata | any[]>;
    id?: string;
}
export declare const createNgModule: MetadataFactory<NgModule>;
export interface ModuleWithProviders {
    ngModule: Type;
    providers?: Provider[];
}
export interface SchemaMetadata {
    name: string;
}
export declare const CUSTOM_ELEMENTS_SCHEMA: SchemaMetadata;
export declare const NO_ERRORS_SCHEMA: SchemaMetadata;
export declare const createOptional: MetadataFactory<{}>;
export declare const createInjectable: MetadataFactory<{}>;
export declare const createSelf: MetadataFactory<{}>;
export declare const createSkipSelf: MetadataFactory<{}>;
export declare const createHost: MetadataFactory<{}>;
export interface Type extends Function {
    new (...args: any[]): any;
}
export declare const Type: FunctionConstructor;
export declare enum SecurityContext {
    NONE = 0,
    HTML = 1,
    STYLE = 2,
    SCRIPT = 3,
    URL = 4,
    RESOURCE_URL = 5,
}
export declare type Provider = any;
export declare const enum NodeFlags {
    None = 0,
    TypeElement = 1,
    TypeText = 2,
    ProjectedTemplate = 4,
    CatRenderNode = 3,
    TypeNgContent = 8,
    TypePipe = 16,
    TypePureArray = 32,
    TypePureObject = 64,
    TypePurePipe = 128,
    CatPureExpression = 224,
    TypeValueProvider = 256,
    TypeClassProvider = 512,
    TypeFactoryProvider = 1024,
    TypeUseExistingProvider = 2048,
    LazyProvider = 4096,
    PrivateProvider = 8192,
    TypeDirective = 16384,
    Component = 32768,
    CatProviderNoDirective = 3840,
    CatProvider = 20224,
    OnInit = 65536,
    OnDestroy = 131072,
    DoCheck = 262144,
    OnChanges = 524288,
    AfterContentInit = 1048576,
    AfterContentChecked = 2097152,
    AfterViewInit = 4194304,
    AfterViewChecked = 8388608,
    EmbeddedViews = 16777216,
    ComponentView = 33554432,
    TypeContentQuery = 67108864,
    TypeViewQuery = 134217728,
    StaticQuery = 268435456,
    DynamicQuery = 536870912,
    CatQuery = 201326592,
    Types = 201347067,
}
export declare const enum DepFlags {
    None = 0,
    SkipSelf = 1,
    Optional = 2,
    Value = 8,
}
export declare const enum ArgumentType {
    Inline = 0,
    Dynamic = 1,
}
export declare const enum BindingFlags {
    TypeElementAttribute = 1,
    TypeElementClass = 2,
    TypeElementStyle = 4,
    TypeProperty = 8,
    SyntheticProperty = 16,
    SyntheticHostProperty = 32,
    CatSyntheticProperty = 48,
    Types = 15,
}
export declare const enum QueryBindingType {
    First = 0,
    All = 1,
}
export declare const enum QueryValueType {
    ElementRef = 0,
    RenderElement = 1,
    TemplateRef = 2,
    ViewContainerRef = 3,
    Provider = 4,
}
export declare const enum ViewFlags {
    None = 0,
    OnPush = 2,
}
export declare enum MissingTranslationStrategy {
    Error = 0,
    Warning = 1,
    Ignore = 2,
}
export interface MetadataFactory<T> {
    (...args: any[]): T;
    isTypeOf(obj: any): obj is T;
    ngMetadataName: string;
}
export interface Route {
    children?: Route[];
    loadChildren?: string | Type | any;
}
