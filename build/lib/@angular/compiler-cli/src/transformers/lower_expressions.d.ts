import * as ts from 'typescript';
import { CollectorOptions, ModuleMetadata } from '../metadata/index';
export interface LoweringRequest {
    kind: ts.SyntaxKind;
    location: number;
    end: number;
    name: string;
}
export declare type RequestLocationMap = Map<number, LoweringRequest>;
export declare function getExpressionLoweringTransformFactory(requestsMap: RequestsMap, program: ts.Program): (context: ts.TransformationContext) => (sourceFile: ts.SourceFile) => ts.SourceFile;
export interface RequestsMap {
    getRequests(sourceFile: ts.SourceFile): RequestLocationMap;
}
export declare class LowerMetadataCache implements RequestsMap {
    private strict;
    private collector;
    private metadataCache;
    constructor(options: CollectorOptions, strict?: boolean | undefined);
    getMetadata(sourceFile: ts.SourceFile): ModuleMetadata | undefined;
    getRequests(sourceFile: ts.SourceFile): RequestLocationMap;
    private ensureMetadataAndRequests(sourceFile);
    private getMetadataAndRequests(sourceFile);
}
