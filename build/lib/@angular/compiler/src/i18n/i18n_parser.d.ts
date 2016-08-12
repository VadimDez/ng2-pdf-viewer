import * as html from '../ml_parser/ast';
import { InterpolationConfig } from '../ml_parser/interpolation_config';
import * as i18n from './i18n_ast';
/**
 * Returns a function converting html Messages to i18n Messages given an interpolationConfig
 */
export declare function createI18nMessageFactory(interpolationConfig: InterpolationConfig): (nodes: html.Node[], meaning: string, description: string) => i18n.Message;
