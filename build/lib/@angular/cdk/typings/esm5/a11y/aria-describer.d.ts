/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectionToken, Optional } from '@angular/core';
/**
 * Interface used to register message elements and keep a count of how many registrations have
 * the same message and the reference to the message element used for the `aria-describedby`.
 */
export interface RegisteredMessage {
    /** The element containing the message. */
    messageElement: Element;
    /** The number of elements that reference this message element via `aria-describedby`. */
    referenceCount: number;
}
/** ID used for the body container where all messages are appended. */
export declare const MESSAGES_CONTAINER_ID = "cdk-describedby-message-container";
/** ID prefix used for each created message element. */
export declare const CDK_DESCRIBEDBY_ID_PREFIX = "cdk-describedby-message";
/** Attribute given to each host element that is described by a message element. */
export declare const CDK_DESCRIBEDBY_HOST_ATTRIBUTE = "cdk-describedby-host";
/**
 * Utility that creates visually hidden elements with a message content. Useful for elements that
 * want to use aria-describedby to further describe themselves without adding additional visual
 * content.
 * @docs-private
 */
export declare class AriaDescriber {
    private _document;
    constructor(_document: any);
    /**
     * Adds to the host element an aria-describedby reference to a hidden element that contains
     * the message. If the same message has already been registered, then it will reuse the created
     * message element.
     */
    describe(hostElement: Element, message: string): void;
    /** Removes the host element's aria-describedby reference to the message element. */
    removeDescription(hostElement: Element, message: string): void;
    /** Unregisters all created message elements and removes the message container. */
    ngOnDestroy(): void;
    /**
     * Creates a new element in the visually hidden message container element with the message
     * as its content and adds it to the message registry.
     */
    private _createMessageElement(message);
    /** Deletes the message element from the global messages container. */
    private _deleteMessageElement(message);
    /** Creates the global container for all aria-describedby messages. */
    private _createMessagesContainer();
    /** Deletes the global messages container. */
    private _deleteMessagesContainer();
    /** Removes all cdk-describedby messages that are hosted through the element. */
    private _removeCdkDescribedByReferenceIds(element);
    /**
     * Adds a message reference to the element using aria-describedby and increments the registered
     * message's reference count.
     */
    private _addMessageReference(element, message);
    /**
     * Removes a message reference from the element using aria-describedby
     * and decrements the registered message's reference count.
     */
    private _removeMessageReference(element, message);
    /** Returns true if the element has been described by the provided message ID. */
    private _isElementDescribedByMessage(element, message);
}
/** @docs-private */
export declare function ARIA_DESCRIBER_PROVIDER_FACTORY(parentDispatcher: AriaDescriber, _document: any): AriaDescriber;
/** @docs-private */
export declare const ARIA_DESCRIBER_PROVIDER: {
    provide: typeof AriaDescriber;
    deps: (Optional[] | InjectionToken<any>)[];
    useFactory: (parentDispatcher: AriaDescriber, _document: any) => AriaDescriber;
};
