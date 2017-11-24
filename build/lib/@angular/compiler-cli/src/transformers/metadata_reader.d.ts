import { ModuleMetadata } from '../metadata';
export interface MetadataReaderHost {
    getSourceFileMetadata(filePath: string): ModuleMetadata | undefined;
    cacheMetadata?(fileName: string): boolean;
    fileExists(filePath: string): boolean;
    readFile(filePath: string): string;
}
export interface MetadataReaderCache {
    /**
     * @internal
     */
    data: Map<string, ModuleMetadata[] | undefined>;
}
export declare function createMetadataReaderCache(): MetadataReaderCache;
export declare function readMetadata(filePath: string, host: MetadataReaderHost, cache?: MetadataReaderCache): ModuleMetadata[] | undefined;
