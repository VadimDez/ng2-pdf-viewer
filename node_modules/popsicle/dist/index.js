"use strict";
var http_1 = require('http');
var https_1 = require('https');
var stream_1 = require('stream');
var urlLib = require('url');
var arrify = require('arrify');
var Promise = require('any-promise');
var index_1 = require('./plugins/index');
exports.use = index_1.defaults;
var REDIRECT_TYPE;
(function (REDIRECT_TYPE) {
    REDIRECT_TYPE[REDIRECT_TYPE["FOLLOW_WITH_GET"] = 0] = "FOLLOW_WITH_GET";
    REDIRECT_TYPE[REDIRECT_TYPE["FOLLOW_WITH_CONFIRMATION"] = 1] = "FOLLOW_WITH_CONFIRMATION";
})(REDIRECT_TYPE || (REDIRECT_TYPE = {}));
var REDIRECT_STATUS = {
    '300': REDIRECT_TYPE.FOLLOW_WITH_GET,
    '301': REDIRECT_TYPE.FOLLOW_WITH_GET,
    '302': REDIRECT_TYPE.FOLLOW_WITH_GET,
    '303': REDIRECT_TYPE.FOLLOW_WITH_GET,
    '305': REDIRECT_TYPE.FOLLOW_WITH_GET,
    '307': REDIRECT_TYPE.FOLLOW_WITH_CONFIRMATION,
    '308': REDIRECT_TYPE.FOLLOW_WITH_CONFIRMATION
};
function open(request) {
    var url = request.url, method = request.method, body = request.body, options = request.options;
    var maxRedirects = num(options.maxRedirects, 5);
    var followRedirects = options.followRedirects !== false;
    var requestCount = 0;
    var isStreaming = false;
    var confirmRedirect = typeof options.followRedirects === 'function' ?
        options.followRedirects : falsey;
    function get(url, method, body) {
        if (requestCount++ > maxRedirects) {
            return Promise.reject(request.error("Exceeded maximum of " + maxRedirects + " redirects", 'EMAXREDIRECTS'));
        }
        return appendCookies(request)
            .then(function () {
            return new Promise(function (resolve, reject) {
                var arg = urlLib.parse(url);
                var isHttp = arg.protocol !== 'https:';
                var engine = isHttp ? http_1.request : https_1.request;
                arg.method = method;
                arg.headers = request.toHeaders();
                arg.agent = options.agent;
                arg.rejectUnauthorized = options.rejectUnauthorized !== false;
                arg.ca = options.ca;
                arg.cert = options.cert;
                arg.key = options.key;
                var rawRequest = engine(arg);
                var requestStream = new stream_1.PassThrough();
                var responseStream = new stream_1.PassThrough();
                requestStream.on('data', function (chunk) {
                    request.uploadedBytes += chunk.length;
                });
                requestStream.on('end', function () {
                    request.uploadedBytes = request.uploadLength;
                });
                responseStream.on('data', function (chunk) {
                    request.downloadedBytes += chunk.length;
                });
                responseStream.on('end', function () {
                    request.downloadedBytes = request.downloadLength;
                });
                function response(rawResponse) {
                    var status = rawResponse.statusCode;
                    var redirect = REDIRECT_STATUS[status];
                    if (followRedirects && redirect != null && rawResponse.headers.location) {
                        var newUrl = urlLib.resolve(url, rawResponse.headers.location);
                        rawResponse.resume();
                        request.remove('Cookie');
                        if (redirect === REDIRECT_TYPE.FOLLOW_WITH_GET) {
                            request.set('Content-Length', '0');
                            return get(newUrl, 'GET');
                        }
                        if (redirect === REDIRECT_TYPE.FOLLOW_WITH_CONFIRMATION) {
                            if (arg.method === 'GET' || arg.method === 'HEAD') {
                                return get(newUrl, method, body);
                            }
                            if (confirmRedirect(rawRequest, rawResponse)) {
                                return get(newUrl, method, body);
                            }
                        }
                    }
                    request.downloadLength = num(rawResponse.headers['content-length'], 0);
                    isStreaming = true;
                    rawResponse.pipe(responseStream);
                    return Promise.resolve({
                        body: responseStream,
                        status: status,
                        statusText: rawResponse.statusMessage,
                        headers: rawResponse.headers,
                        rawHeaders: rawResponse.rawHeaders,
                        url: url
                    });
                }
                function emitError(error) {
                    rawRequest.abort();
                    if (isStreaming) {
                        responseStream.emit('error', error);
                    }
                    else {
                        reject(error);
                    }
                }
                rawRequest.once('response', function (message) {
                    resolve(setCookies(request, message).then(function () { return response(message); }));
                });
                rawRequest.once('error', function (error) {
                    emitError(request.error("Unable to connect to \"" + url + "\"", 'EUNAVAILABLE', error));
                });
                rawRequest.once('clientAborted', function () {
                    emitError(request.error('Request aborted', 'EABORT'));
                });
                request._raw = rawRequest;
                request.uploadLength = num(rawRequest.getHeader('content-length'), 0);
                requestStream.pipe(rawRequest);
                requestStream.once('error', emitError);
                if (body) {
                    if (typeof body.pipe === 'function') {
                        body.pipe(requestStream);
                        body.once('error', emitError);
                    }
                    else {
                        requestStream.end(body);
                    }
                }
                else {
                    requestStream.end();
                }
            });
        });
    }
    return get(url, method, body);
}
exports.open = open;
function abort(request) {
    request._raw.emit('clientAborted');
    request._raw.abort();
}
exports.abort = abort;
function num(value, fallback) {
    if (value == null) {
        return fallback;
    }
    return isNaN(value) ? fallback : Number(value);
}
function falsey() {
    return false;
}
function appendCookies(request) {
    return new Promise(function (resolve, reject) {
        if (!request.options.jar) {
            return resolve();
        }
        request.options.jar.getCookies(request.url, function (err, cookies) {
            if (err) {
                return reject(err);
            }
            if (cookies.length) {
                request.append('Cookie', cookies.join('; '));
            }
            return resolve();
        });
    });
}
function setCookies(request, message) {
    return new Promise(function (resolve, reject) {
        if (!request.options.jar) {
            return resolve();
        }
        var cookies = arrify(message.headers['set-cookie']);
        if (!cookies.length) {
            return resolve();
        }
        var setCookies = cookies.map(function (cookie) {
            return new Promise(function (resolve, reject) {
                request.options.jar.setCookie(cookie, request.url, function (err) {
                    return err ? reject(err) : resolve();
                });
            });
        });
        return resolve(Promise.all(setCookies));
    });
}
//# sourceMappingURL=index.js.map