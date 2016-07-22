import { HostMetadata, InjectMetadata, InjectableMetadata, OptionalMetadata, SelfMetadata, SkipSelfMetadata } from './metadata';
/**
 * Factory for creating {@link InjectMetadata}.
 * @stable
 */
export interface InjectMetadataFactory {
    (token: any): any;
    new (token: any): InjectMetadata;
}
/**
 * Factory for creating {@link OptionalMetadata}.
 * @stable
 */
export interface OptionalMetadataFactory {
    (): any;
    new (): OptionalMetadata;
}
/**
 * Factory for creating {@link InjectableMetadata}.
 * @stable
 */
export interface InjectableMetadataFactory {
    (): any;
    new (): InjectableMetadata;
}
/**
 * Factory for creating {@link SelfMetadata}.
 * @stable
 */
export interface SelfMetadataFactory {
    (): any;
    new (): SelfMetadata;
}
/**
 * Factory for creating {@link HostMetadata}.
 * @stable
 */
export interface HostMetadataFactory {
    (): any;
    new (): HostMetadata;
}
/**
 * Factory for creating {@link SkipSelfMetadata}.
 * @stable
 */
export interface SkipSelfMetadataFactory {
    (): any;
    new (): SkipSelfMetadata;
}
/**
 * Factory for creating {@link InjectMetadata}.
 * @stable
 * @Annotation
 */
export declare var Inject: InjectMetadataFactory;
/**
 * Factory for creating {@link OptionalMetadata}.
 * @stable
 * @Annotation
 */
export declare var Optional: OptionalMetadataFactory;
/**
 * Factory for creating {@link InjectableMetadata}.
 * @stable
 * @Annotation
 */
export declare var Injectable: InjectableMetadataFactory;
/**
 * Factory for creating {@link SelfMetadata}.
 * @stable
 * @Annotation
 */
export declare var Self: SelfMetadataFactory;
/**
 * Factory for creating {@link HostMetadata}.
 * @stable
 * @Annotation
 */
export declare var Host: HostMetadataFactory;
/**
 * Factory for creating {@link SkipSelfMetadata}.
 * @stable
 * @Annotation
 */
export declare var SkipSelf: SkipSelfMetadataFactory;
