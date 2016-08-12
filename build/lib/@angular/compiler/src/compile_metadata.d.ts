/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, SchemaMetadata, ViewEncapsulation } from '@angular/core';
import { LifecycleHooks } from '../core_private';
import { Type } from './facade/lang';
export declare abstract class CompileMetadataWithIdentifier {
    identifier: CompileIdentifierMetadata;
    runtimeCacheKey: any;
    assetCacheKey: any;
    equalsTo(id2: CompileMetadataWithIdentifier): boolean;
}
export declare class CompileAnimationEntryMetadata {
    name: string;
    definitions: CompileAnimationStateMetadata[];
    constructor(name?: string, definitions?: CompileAnimationStateMetadata[]);
}
export declare abstract class CompileAnimationStateMetadata {
}
export declare class CompileAnimationStateDeclarationMetadata extends CompileAnimationStateMetadata {
    stateNameExpr: string;
    styles: CompileAnimationStyleMetadata;
    constructor(stateNameExpr: string, styles: CompileAnimationStyleMetadata);
}
export declare class CompileAnimationStateTransitionMetadata extends CompileAnimationStateMetadata {
    stateChangeExpr: string;
    steps: CompileAnimationMetadata;
    constructor(stateChangeExpr: string, steps: CompileAnimationMetadata);
}
export declare abstract class CompileAnimationMetadata {
}
export declare class CompileAnimationKeyframesSequenceMetadata extends CompileAnimationMetadata {
    steps: CompileAnimationStyleMetadata[];
    constructor(steps?: CompileAnimationStyleMetadata[]);
}
export declare class CompileAnimationStyleMetadata extends CompileAnimationMetadata {
    offset: number;
    styles: Array<string | {
        [key: string]: string | number;
    }>;
    constructor(offset: number, styles?: Array<string | {
        [key: string]: string | number;
    }>);
}
export declare class CompileAnimationAnimateMetadata extends CompileAnimationMetadata {
    timings: string | number;
    styles: CompileAnimationStyleMetadata | CompileAnimationKeyframesSequenceMetadata;
    constructor(timings?: string | number, styles?: CompileAnimationStyleMetadata | CompileAnimationKeyframesSequenceMetadata);
}
export declare abstract class CompileAnimationWithStepsMetadata extends CompileAnimationMetadata {
    steps: CompileAnimationMetadata[];
    constructor(steps?: CompileAnimationMetadata[]);
}
export declare class CompileAnimationSequenceMetadata extends CompileAnimationWithStepsMetadata {
    constructor(steps?: CompileAnimationMetadata[]);
}
export declare class CompileAnimationGroupMetadata extends CompileAnimationWithStepsMetadata {
    constructor(steps?: CompileAnimationMetadata[]);
}
export declare class CompileIdentifierMetadata implements CompileMetadataWithIdentifier {
    runtime: any;
    name: string;
    prefix: string;
    moduleUrl: string;
    value: any;
    private _assetCacheKey;
    constructor({runtime, name, moduleUrl, prefix, value}?: {
        runtime?: any;
        name?: string;
        moduleUrl?: string;
        prefix?: string;
        value?: any;
    });
    identifier: CompileIdentifierMetadata;
    runtimeCacheKey: any;
    assetCacheKey: any;
    equalsTo(id2: CompileIdentifierMetadata): boolean;
}
export declare class CompileDiDependencyMetadata {
    isAttribute: boolean;
    isSelf: boolean;
    isHost: boolean;
    isSkipSelf: boolean;
    isOptional: boolean;
    isValue: boolean;
    query: CompileQueryMetadata;
    viewQuery: CompileQueryMetadata;
    token: CompileTokenMetadata;
    value: any;
    constructor({isAttribute, isSelf, isHost, isSkipSelf, isOptional, isValue, query, viewQuery, token, value}?: {
        isAttribute?: boolean;
        isSelf?: boolean;
        isHost?: boolean;
        isSkipSelf?: boolean;
        isOptional?: boolean;
        isValue?: boolean;
        query?: CompileQueryMetadata;
        viewQuery?: CompileQueryMetadata;
        token?: CompileTokenMetadata;
        value?: any;
    });
}
export declare class CompileProviderMetadata {
    token: CompileTokenMetadata;
    useClass: CompileTypeMetadata;
    useValue: any;
    useExisting: CompileTokenMetadata;
    useFactory: CompileFactoryMetadata;
    deps: CompileDiDependencyMetadata[];
    multi: boolean;
    constructor({token, useClass, useValue, useExisting, useFactory, deps, multi}: {
        token?: CompileTokenMetadata;
        useClass?: CompileTypeMetadata;
        useValue?: any;
        useExisting?: CompileTokenMetadata;
        useFactory?: CompileFactoryMetadata;
        deps?: CompileDiDependencyMetadata[];
        multi?: boolean;
    });
}
export declare class CompileFactoryMetadata extends CompileIdentifierMetadata {
    diDeps: CompileDiDependencyMetadata[];
    constructor({runtime, name, moduleUrl, prefix, diDeps, value}: {
        runtime?: Function;
        name?: string;
        prefix?: string;
        moduleUrl?: string;
        value?: boolean;
        diDeps?: CompileDiDependencyMetadata[];
    });
}
export declare class CompileTokenMetadata implements CompileMetadataWithIdentifier {
    value: any;
    identifier: CompileIdentifierMetadata;
    identifierIsInstance: boolean;
    constructor({value, identifier, identifierIsInstance}: {
        value?: any;
        identifier?: CompileIdentifierMetadata;
        identifierIsInstance?: boolean;
    });
    runtimeCacheKey: any;
    assetCacheKey: any;
    equalsTo(token2: CompileTokenMetadata): boolean;
    name: string;
}
/**
 * Note: We only need this in places where we need to support identifiers that
 * don't have a `runtime` value given by the `StaticReflector`. E.g. see the `identifiers`
 * file where we have some identifiers hard coded by name/module path.
 *
 * TODO(tbosch): Eventually, all of these places should go through the static reflector
 * as well, providing them with a valid `StaticSymbol` that is again a singleton.
 */
export declare class CompileIdentifierMap<KEY extends CompileMetadataWithIdentifier, VALUE> {
    private _valueMap;
    private _values;
    private _tokens;
    add(token: KEY, value: VALUE): void;
    get(token: KEY): VALUE;
    keys(): KEY[];
    values(): VALUE[];
    size: number;
}
/**
 * Metadata regarding compilation of a type.
 */
export declare class CompileTypeMetadata extends CompileIdentifierMetadata {
    isHost: boolean;
    diDeps: CompileDiDependencyMetadata[];
    lifecycleHooks: LifecycleHooks[];
    constructor({runtime, name, moduleUrl, prefix, isHost, value, diDeps, lifecycleHooks}?: {
        runtime?: Type;
        name?: string;
        moduleUrl?: string;
        prefix?: string;
        isHost?: boolean;
        value?: any;
        diDeps?: CompileDiDependencyMetadata[];
        lifecycleHooks?: LifecycleHooks[];
    });
}
export declare class CompileQueryMetadata {
    selectors: Array<CompileTokenMetadata>;
    descendants: boolean;
    first: boolean;
    propertyName: string;
    read: CompileTokenMetadata;
    constructor({selectors, descendants, first, propertyName, read}?: {
        selectors?: Array<CompileTokenMetadata>;
        descendants?: boolean;
        first?: boolean;
        propertyName?: string;
        read?: CompileTokenMetadata;
    });
}
/**
 * Metadata about a stylesheet
 */
export declare class CompileStylesheetMetadata {
    moduleUrl: string;
    styles: string[];
    styleUrls: string[];
    constructor({moduleUrl, styles, styleUrls}?: {
        moduleUrl?: string;
        styles?: string[];
        styleUrls?: string[];
    });
}
/**
 * Metadata regarding compilation of a template.
 */
export declare class CompileTemplateMetadata {
    encapsulation: ViewEncapsulation;
    template: string;
    templateUrl: string;
    styles: string[];
    styleUrls: string[];
    externalStylesheets: CompileStylesheetMetadata[];
    animations: CompileAnimationEntryMetadata[];
    ngContentSelectors: string[];
    interpolation: [string, string];
    constructor({encapsulation, template, templateUrl, styles, styleUrls, externalStylesheets, animations, ngContentSelectors, interpolation}?: {
        encapsulation?: ViewEncapsulation;
        template?: string;
        templateUrl?: string;
        styles?: string[];
        styleUrls?: string[];
        externalStylesheets?: CompileStylesheetMetadata[];
        ngContentSelectors?: string[];
        animations?: CompileAnimationEntryMetadata[];
        interpolation?: [string, string];
    });
}
/**
 * Metadata regarding compilation of a directive.
 */
export declare class CompileDirectiveMetadata implements CompileMetadataWithIdentifier {
    static create({type, isComponent, selector, exportAs, changeDetection, inputs, outputs, host, providers, viewProviders, queries, viewQueries, entryComponents, viewDirectives, viewPipes, template}?: {
        type?: CompileTypeMetadata;
        isComponent?: boolean;
        selector?: string;
        exportAs?: string;
        changeDetection?: ChangeDetectionStrategy;
        inputs?: string[];
        outputs?: string[];
        host?: {
            [key: string]: string;
        };
        providers?: Array<CompileProviderMetadata | CompileTypeMetadata | CompileIdentifierMetadata | any[]>;
        viewProviders?: Array<CompileProviderMetadata | CompileTypeMetadata | CompileIdentifierMetadata | any[]>;
        queries?: CompileQueryMetadata[];
        viewQueries?: CompileQueryMetadata[];
        entryComponents?: CompileTypeMetadata[];
        viewDirectives?: CompileTypeMetadata[];
        viewPipes?: CompileTypeMetadata[];
        template?: CompileTemplateMetadata;
    }): CompileDirectiveMetadata;
    type: CompileTypeMetadata;
    isComponent: boolean;
    selector: string;
    exportAs: string;
    changeDetection: ChangeDetectionStrategy;
    inputs: {
        [key: string]: string;
    };
    outputs: {
        [key: string]: string;
    };
    hostListeners: {
        [key: string]: string;
    };
    hostProperties: {
        [key: string]: string;
    };
    hostAttributes: {
        [key: string]: string;
    };
    providers: CompileProviderMetadata[];
    viewProviders: CompileProviderMetadata[];
    queries: CompileQueryMetadata[];
    viewQueries: CompileQueryMetadata[];
    entryComponents: CompileTypeMetadata[];
    viewDirectives: CompileTypeMetadata[];
    viewPipes: CompileTypeMetadata[];
    template: CompileTemplateMetadata;
    constructor({type, isComponent, selector, exportAs, changeDetection, inputs, outputs, hostListeners, hostProperties, hostAttributes, providers, viewProviders, queries, viewQueries, entryComponents, viewDirectives, viewPipes, template}?: {
        type?: CompileTypeMetadata;
        isComponent?: boolean;
        selector?: string;
        exportAs?: string;
        changeDetection?: ChangeDetectionStrategy;
        inputs?: {
            [key: string]: string;
        };
        outputs?: {
            [key: string]: string;
        };
        hostListeners?: {
            [key: string]: string;
        };
        hostProperties?: {
            [key: string]: string;
        };
        hostAttributes?: {
            [key: string]: string;
        };
        providers?: Array<CompileProviderMetadata | CompileTypeMetadata | CompileIdentifierMetadata | any[]>;
        viewProviders?: Array<CompileProviderMetadata | CompileTypeMetadata | CompileIdentifierMetadata | any[]>;
        queries?: CompileQueryMetadata[];
        viewQueries?: CompileQueryMetadata[];
        entryComponents?: CompileTypeMetadata[];
        viewDirectives?: CompileTypeMetadata[];
        viewPipes?: CompileTypeMetadata[];
        template?: CompileTemplateMetadata;
    });
    identifier: CompileIdentifierMetadata;
    runtimeCacheKey: any;
    assetCacheKey: any;
    equalsTo(other: CompileMetadataWithIdentifier): boolean;
}
/**
 * Construct {@link CompileDirectiveMetadata} from {@link ComponentTypeMetadata} and a selector.
 */
export declare function createHostComponentMeta(compMeta: CompileDirectiveMetadata): CompileDirectiveMetadata;
export declare class CompilePipeMetadata implements CompileMetadataWithIdentifier {
    type: CompileTypeMetadata;
    name: string;
    pure: boolean;
    constructor({type, name, pure}?: {
        type?: CompileTypeMetadata;
        name?: string;
        pure?: boolean;
    });
    identifier: CompileIdentifierMetadata;
    runtimeCacheKey: any;
    assetCacheKey: any;
    equalsTo(other: CompileMetadataWithIdentifier): boolean;
}
/**
 * Metadata regarding compilation of a directive.
 */
export declare class CompileNgModuleMetadata implements CompileMetadataWithIdentifier {
    type: CompileTypeMetadata;
    declaredDirectives: CompileDirectiveMetadata[];
    exportedDirectives: CompileDirectiveMetadata[];
    declaredPipes: CompilePipeMetadata[];
    exportedPipes: CompilePipeMetadata[];
    entryComponents: CompileTypeMetadata[];
    bootstrapComponents: CompileTypeMetadata[];
    providers: CompileProviderMetadata[];
    importedModules: CompileNgModuleMetadata[];
    exportedModules: CompileNgModuleMetadata[];
    schemas: SchemaMetadata[];
    transitiveModule: TransitiveCompileNgModuleMetadata;
    constructor({type, providers, declaredDirectives, exportedDirectives, declaredPipes, exportedPipes, entryComponents, bootstrapComponents, importedModules, exportedModules, schemas, transitiveModule}?: {
        type?: CompileTypeMetadata;
        providers?: Array<CompileProviderMetadata | CompileTypeMetadata | CompileIdentifierMetadata | any[]>;
        declaredDirectives?: CompileDirectiveMetadata[];
        exportedDirectives?: CompileDirectiveMetadata[];
        declaredPipes?: CompilePipeMetadata[];
        exportedPipes?: CompilePipeMetadata[];
        entryComponents?: CompileTypeMetadata[];
        bootstrapComponents?: CompileTypeMetadata[];
        importedModules?: CompileNgModuleMetadata[];
        exportedModules?: CompileNgModuleMetadata[];
        transitiveModule?: TransitiveCompileNgModuleMetadata;
        schemas?: SchemaMetadata[];
    });
    identifier: CompileIdentifierMetadata;
    runtimeCacheKey: any;
    assetCacheKey: any;
    equalsTo(other: CompileMetadataWithIdentifier): boolean;
}
export declare class TransitiveCompileNgModuleMetadata {
    modules: CompileNgModuleMetadata[];
    providers: CompileProviderMetadata[];
    entryComponents: CompileTypeMetadata[];
    directives: CompileDirectiveMetadata[];
    pipes: CompilePipeMetadata[];
    directivesSet: Set<Type>;
    pipesSet: Set<Type>;
    constructor(modules: CompileNgModuleMetadata[], providers: CompileProviderMetadata[], entryComponents: CompileTypeMetadata[], directives: CompileDirectiveMetadata[], pipes: CompilePipeMetadata[]);
}
export declare function removeIdentifierDuplicates<T extends CompileMetadataWithIdentifier>(items: T[]): T[];
export declare function isStaticSymbol(value: any): value is StaticSymbol;
export interface StaticSymbol {
    name: string;
    filePath: string;
}
