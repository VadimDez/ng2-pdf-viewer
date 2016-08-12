import * as html from '../../ml_parser/ast';
import * as i18n from '../i18n_ast';
import { Serializer } from './serializer';
export declare class Xmb implements Serializer {
    write(messageMap: {
        [k: string]: i18n.Message;
    }): string;
    load(content: string, url: string, placeholders: {
        [id: string]: {
            [name: string]: string;
        };
    }): {
        [id: string]: html.Node[];
    };
}
