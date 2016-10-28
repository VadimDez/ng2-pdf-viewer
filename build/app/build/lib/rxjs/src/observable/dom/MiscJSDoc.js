"use strict";
var AjaxRequestDoc = (function () {
    function AjaxRequestDoc() {
        this.url = '';
        this.body = 0;
        this.user = '';
        this.async = false;
        this.method = '';
        this.headers = null;
        this.timeout = 0;
        this.password = '';
        this.hasContent = false;
        this.crossDomain = false;
        this.progressSubscriber = null;
        this.responseType = '';
    }
    AjaxRequestDoc.prototype.createXHR = function () {
        return null;
    };
    AjaxRequestDoc.prototype.resultSelector = function (response) {
        return null;
    };
    return AjaxRequestDoc;
}());
exports.AjaxRequestDoc = AjaxRequestDoc;
//# sourceMappingURL=MiscJSDoc.js.map