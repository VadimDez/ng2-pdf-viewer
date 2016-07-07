import { PlatformLocation, UrlChangeListener } from '@angular/common';
import { ClientMessageBrokerFactory } from '../shared/client_message_broker';
import { MessageBus } from '../shared/message_bus';
import { Serializer } from '../shared/serializer';
export declare class WebWorkerPlatformLocation extends PlatformLocation {
    private _serializer;
    private _broker;
    private _popStateListeners;
    private _hashChangeListeners;
    private _location;
    private _channelSource;
    constructor(brokerFactory: ClientMessageBrokerFactory, bus: MessageBus, _serializer: Serializer);
    getBaseHrefFromDOM(): string;
    onPopState(fn: UrlChangeListener): void;
    onHashChange(fn: UrlChangeListener): void;
    pathname: string;
    readonly search: string;
    readonly hash: string;
    pushState(state: any, title: string, url: string): void;
    replaceState(state: any, title: string, url: string): void;
    forward(): void;
    back(): void;
}
