import { CompileTypeMetadata, CompileDirectiveMetadata, CompileTemplateMetadata } from './compile_metadata';
import { XHR } from './xhr';
import { UrlResolver } from './url_resolver';
import { HtmlParser } from './html_parser';
import { CompilerConfig } from './config';
export declare class DirectiveNormalizer {
    private _xhr;
    private _urlResolver;
    private _htmlParser;
    private _config;
    constructor(_xhr: XHR, _urlResolver: UrlResolver, _htmlParser: HtmlParser, _config: CompilerConfig);
    normalizeDirective(directive: CompileDirectiveMetadata): Promise<CompileDirectiveMetadata>;
    normalizeTemplate(directiveType: CompileTypeMetadata, template: CompileTemplateMetadata): Promise<CompileTemplateMetadata>;
    normalizeLoadedTemplate(directiveType: CompileTypeMetadata, templateMeta: CompileTemplateMetadata, template: string, templateAbsUrl: string): CompileTemplateMetadata;
}
