import { CompileDirectiveMetadata, CompileStylesheetMetadata, CompileTemplateMetadata, CompileTypeMetadata } from './compile_metadata';
import { CompilerConfig } from './config';
import { HtmlParser } from './html_parser';
import { UrlResolver } from './url_resolver';
import { XHR } from './xhr';
export declare class NormalizeDirectiveResult {
    syncResult: CompileDirectiveMetadata;
    asyncResult: Promise<CompileDirectiveMetadata>;
    constructor(syncResult: CompileDirectiveMetadata, asyncResult: Promise<CompileDirectiveMetadata>);
}
export declare class DirectiveNormalizer {
    private _xhr;
    private _urlResolver;
    private _htmlParser;
    private _config;
    private _xhrCache;
    constructor(_xhr: XHR, _urlResolver: UrlResolver, _htmlParser: HtmlParser, _config: CompilerConfig);
    clearCache(): void;
    clearCacheFor(normalizedDirective: CompileDirectiveMetadata): void;
    private _fetch(url);
    normalizeDirective(directive: CompileDirectiveMetadata): NormalizeDirectiveResult;
    normalizeTemplateSync(directiveType: CompileTypeMetadata, template: CompileTemplateMetadata): CompileTemplateMetadata;
    normalizeTemplateAsync(directiveType: CompileTypeMetadata, template: CompileTemplateMetadata): Promise<CompileTemplateMetadata>;
    normalizeLoadedTemplate(directiveType: CompileTypeMetadata, templateMeta: CompileTemplateMetadata, template: string, templateAbsUrl: string): CompileTemplateMetadata;
    normalizeExternalStylesheets(templateMeta: CompileTemplateMetadata): Promise<CompileTemplateMetadata>;
    private _loadMissingExternalStylesheets(styleUrls, loadedStylesheets?);
    normalizeStylesheet(stylesheet: CompileStylesheetMetadata): CompileStylesheetMetadata;
}
