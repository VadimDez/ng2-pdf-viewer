/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ListWrapper } from '../../facade/collection';
import * as xml from './xml_helper';
const _MESSAGES_TAG = 'messagebundle';
const _MESSAGE_TAG = 'msg';
const _PLACEHOLDER_TAG = 'ph';
const _EXEMPLE_TAG = 'ex';
const _DOCTYPE = `<!ELEMENT messagebundle (msg)*>
<!ATTLIST messagebundle class CDATA #IMPLIED>

<!ELEMENT msg (#PCDATA|ph|source)*>
<!ATTLIST msg id CDATA #IMPLIED>
<!ATTLIST msg seq CDATA #IMPLIED>
<!ATTLIST msg name CDATA #IMPLIED>
<!ATTLIST msg desc CDATA #IMPLIED>
<!ATTLIST msg meaning CDATA #IMPLIED>
<!ATTLIST msg obsolete (obsolete) #IMPLIED>
<!ATTLIST msg xml:space (default|preserve) "default">
<!ATTLIST msg is_hidden CDATA #IMPLIED>

<!ELEMENT source (#PCDATA)>

<!ELEMENT ph (#PCDATA|ex)*>
<!ATTLIST ph name CDATA #REQUIRED>

<!ELEMENT ex (#PCDATA)>`;
export class Xmb {
    write(messageMap) {
        const visitor = new _Visitor();
        let rootNode = new xml.Tag(_MESSAGES_TAG);
        rootNode.children.push(new xml.Text('\n'));
        Object.keys(messageMap).forEach((id) => {
            const message = messageMap[id];
            let attrs = { id };
            if (message.description) {
                attrs['desc'] = message.description;
            }
            if (message.meaning) {
                attrs['meaning'] = message.meaning;
            }
            rootNode.children.push(new xml.Text('  '), new xml.Tag(_MESSAGE_TAG, attrs, visitor.serialize(message.nodes)), new xml.Text('\n'));
        });
        return xml.serialize([
            new xml.Declaration({ version: '1.0', encoding: 'UTF-8' }),
            new xml.Text('\n'),
            new xml.Doctype(_MESSAGES_TAG, _DOCTYPE),
            new xml.Text('\n'),
            rootNode,
        ]);
    }
    load(content, url, placeholders) {
        throw new Error('Unsupported');
    }
}
class _Visitor {
    visitText(text, context) { return [new xml.Text(text.value)]; }
    visitContainer(container, context) {
        const nodes = [];
        container.children.forEach((node) => nodes.push(...node.visit(this)));
        return nodes;
    }
    visitIcu(icu, context) {
        const nodes = [new xml.Text(`{${icu.expression}, ${icu.type}, `)];
        Object.keys(icu.cases).forEach((c) => {
            nodes.push(new xml.Text(`${c} {`), ...icu.cases[c].visit(this), new xml.Text(`}`));
        });
        nodes.push(new xml.Text(`}`));
        return nodes;
    }
    visitTagPlaceholder(ph, context) {
        const startEx = new xml.Tag(_EXEMPLE_TAG, {}, [new xml.Text(`<${ph.tag}>`)]);
        const startTagPh = new xml.Tag(_PLACEHOLDER_TAG, { name: ph.startName }, [startEx]);
        if (ph.isVoid) {
            // void tags have no children nor closing tags
            return [startTagPh];
        }
        const closeEx = new xml.Tag(_EXEMPLE_TAG, {}, [new xml.Text(`</${ph.tag}>`)]);
        const closeTagPh = new xml.Tag(_PLACEHOLDER_TAG, { name: ph.closeName }, [closeEx]);
        return [startTagPh, ...this.serialize(ph.children), closeTagPh];
    }
    visitPlaceholder(ph, context) {
        return [new xml.Tag(_PLACEHOLDER_TAG, { name: ph.name })];
    }
    visitIcuPlaceholder(ph, context) {
        return [new xml.Tag(_PLACEHOLDER_TAG, { name: ph.name })];
    }
    serialize(nodes) {
        return ListWrapper.flatten(nodes.map(node => node.visit(this)));
    }
}
//# sourceMappingURL=xmb.js.map