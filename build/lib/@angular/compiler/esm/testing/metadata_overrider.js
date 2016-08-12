/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BaseException } from '../src/facade/exceptions';
import { stringify } from '../src/facade/lang';
let _nextReferenceId = 0;
export class MetadataOverrider {
    constructor() {
        this._references = new Map();
    }
    /**
     * Creates a new instance for the given metadata class
     * based on an old instance and overrides.
     */
    overrideMetadata(metadataClass, oldMetadata, override) {
        const props = {};
        if (oldMetadata) {
            _valueProps(oldMetadata).forEach((prop) => props[prop] = oldMetadata[prop]);
        }
        if (override.set) {
            if (override.remove || override.add) {
                throw new BaseException(`Cannot set and add/remove ${stringify(metadataClass)} at the same time!`);
            }
            setMetadata(props, override.set);
        }
        if (override.remove) {
            removeMetadata(props, override.remove, this._references);
        }
        if (override.add) {
            addMetadata(props, override.add);
        }
        return new metadataClass(props);
    }
}
function removeMetadata(metadata, remove, references) {
    const removeObjects = new Set();
    for (let prop in remove) {
        const removeValue = remove[prop];
        if (removeValue instanceof Array) {
            removeValue.forEach((value) => { removeObjects.add(_propHashKey(prop, value, references)); });
        }
        else {
            removeObjects.add(_propHashKey(prop, removeValue, references));
        }
    }
    for (let prop in metadata) {
        const propValue = metadata[prop];
        if (propValue instanceof Array) {
            metadata[prop] = propValue.filter((value) => { return !removeObjects.has(_propHashKey(prop, value, references)); });
        }
        else {
            if (removeObjects.has(_propHashKey(prop, propValue, references))) {
                metadata[prop] = undefined;
            }
        }
    }
}
function addMetadata(metadata, add) {
    for (let prop in add) {
        const addValue = add[prop];
        const propValue = metadata[prop];
        if (propValue != null && propValue instanceof Array) {
            metadata[prop] = propValue.concat(addValue);
        }
        else {
            metadata[prop] = addValue;
        }
    }
}
function setMetadata(metadata, set) {
    for (let prop in set) {
        metadata[prop] = set[prop];
    }
}
function _propHashKey(propName, propValue, references) {
    const replacer = (key, value) => {
        if (typeof value === 'function') {
            value = _serializeReference(value, references);
        }
        return value;
    };
    return `${propName}:${JSON.stringify(propValue, replacer)}`;
}
function _serializeReference(ref, references) {
    let id = references.get(ref);
    if (!id) {
        id = `${stringify(ref)}${_nextReferenceId++}`;
        references.set(ref, id);
    }
    return id;
}
function _valueProps(obj) {
    const props = [];
    // regular public props
    Object.keys(obj).forEach((prop) => {
        if (!prop.startsWith('_')) {
            props.push(prop);
        }
    });
    // getters
    const proto = Object.getPrototypeOf(obj);
    Object.keys(proto).forEach((protoProp) => {
        var desc = Object.getOwnPropertyDescriptor(proto, protoProp);
        if (!protoProp.startsWith('_') && desc && 'get' in desc) {
            props.push(protoProp);
        }
    });
    return props;
}
//# sourceMappingURL=metadata_overrider.js.map