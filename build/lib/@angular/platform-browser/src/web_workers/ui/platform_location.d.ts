import { BrowserPlatformLocation } from '../../browser/location/browser_platform_location';
import { MessageBus } from '../shared/message_bus';
import { Serializer } from '../shared/serializer';
import { ServiceMessageBrokerFactory } from '../shared/service_message_broker';
export declare class MessageBasedPlatformLocation {
    private _brokerFactory;
    private _platformLocation;
    private _serializer;
    private _channelSink;
    private _broker;
    constructor(_brokerFactory: ServiceMessageBrokerFactory, _platformLocation: BrowserPlatformLocation, bus: MessageBus, _serializer: Serializer);
    start(): void;
    private _getLocation();
    private _sendUrlChangeEvent(e);
    private _setPathname(pathname);
}
