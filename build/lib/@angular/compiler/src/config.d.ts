import { MissingTranslationStrategy, ViewEncapsulation } from './core';
export declare class CompilerConfig {
    defaultEncapsulation: ViewEncapsulation | null;
    enableLegacyTemplate: boolean;
    useJit: boolean;
    jitDevMode: boolean;
    missingTranslation: MissingTranslationStrategy | null;
    preserveWhitespaces: boolean;
    strictInjectionParameters: boolean;
    constructor({defaultEncapsulation, useJit, jitDevMode, missingTranslation, enableLegacyTemplate, preserveWhitespaces, strictInjectionParameters}?: {
        defaultEncapsulation?: ViewEncapsulation;
        useJit?: boolean;
        jitDevMode?: boolean;
        missingTranslation?: MissingTranslationStrategy;
        enableLegacyTemplate?: boolean;
        preserveWhitespaces?: boolean;
        strictInjectionParameters?: boolean;
    });
}
export declare function preserveWhitespacesDefault(preserveWhitespacesOption: boolean | null, defaultSetting?: boolean): boolean;
