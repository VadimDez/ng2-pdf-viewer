/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { SchemaMetadata, SecurityContext } from '@angular/core';
import { ElementSchemaRegistry } from '../index';
export declare class MockSchemaRegistry implements ElementSchemaRegistry {
    existingProperties: {
        [key: string]: boolean;
    };
    attrPropMapping: {
        [key: string]: string;
    };
    constructor(existingProperties: {
        [key: string]: boolean;
    }, attrPropMapping: {
        [key: string]: string;
    });
    hasProperty(tagName: string, property: string, schemas: SchemaMetadata[]): boolean;
    securityContext(tagName: string, property: string): SecurityContext;
    getMappedPropName(attrName: string): string;
    getDefaultComponentElementName(): string;
}
