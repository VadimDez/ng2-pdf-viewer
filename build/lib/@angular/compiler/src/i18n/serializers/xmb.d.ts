import * as i18n from '../i18n_ast';
import { PlaceholderMapper, Serializer } from './serializer';
export declare class Xmb extends Serializer {
    write(messages: i18n.Message[]): string;
    load(content: string, url: string): {
        [msgId: string]: i18n.Node[];
    };
    digest(message: i18n.Message): string;
    createNameMapper(message: i18n.Message): PlaceholderMapper;
}
export declare function digest(message: i18n.Message): string;
/**
 * XMB/XTB placeholders can only contain A-Z, 0-9 and _
 *
 * Because such restrictions do not exist on placeholder names generated locally, the
 * `PlaceholderMapper` is used to convert internal names to XMB names when the XMB file is
 * serialized and back from XTB to internal names when an XTB is loaded.
 */
export declare class XmbPlaceholderMapper implements PlaceholderMapper, i18n.Visitor {
    private internalToXmb;
    private xmbToNextId;
    private xmbToInternal;
    constructor(message: i18n.Message);
    toPublicName(internalName: string): string;
    toInternalName(publicName: string): string;
    visitText(text: i18n.Text, ctx?: any): any;
    visitContainer(container: i18n.Container, ctx?: any): any;
    visitIcu(icu: i18n.Icu, ctx?: any): any;
    visitTagPlaceholder(ph: i18n.TagPlaceholder, ctx?: any): any;
    visitPlaceholder(ph: i18n.Placeholder, ctx?: any): any;
    visitIcuPlaceholder(ph: i18n.IcuPlaceholder, ctx?: any): any;
    private addPlaceholder(internalName);
}
