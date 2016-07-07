"use strict";
/**
 * Message Bus is a low level API used to communicate between the UI and the background.
 * Communication is based on a channel abstraction. Messages published in a
 * given channel to one MessageBusSink are received on the same channel
 * by the corresponding MessageBusSource.
 * @experimental
 */
var MessageBus = (function () {
    function MessageBus() {
    }
    return MessageBus;
}());
exports.MessageBus = MessageBus;
//# sourceMappingURL=message_bus.js.map