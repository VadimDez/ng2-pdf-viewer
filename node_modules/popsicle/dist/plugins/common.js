"use strict";
var Promise = require('any-promise');
var FormData = require('form-data');
var querystring_1 = require('querystring');
var index_1 = require('./is-host/index');
var form_1 = require('../form');
var JSON_MIME_REGEXP = /^application\/(?:[\w!#\$%&\*`\-\.\^~]*\+)?json$/i;
var QUERY_MIME_REGEXP = /^application\/x-www-form-urlencoded$/i;
var FORM_MIME_REGEXP = /^multipart\/form-data$/i;
function wrap(value) {
    return function () { return value; };
}
exports.wrap = wrap;
exports.headers = wrap(function (request, next) {
    if (!request.get('Accept')) {
        request.set('Accept', '*/*');
    }
    request.remove('Host');
    return next();
});
exports.stringify = wrap(function (request, next) {
    var body = request.body;
    if (Object(body) !== body) {
        request.body = body == null ? null : String(body);
        return next();
    }
    if (index_1.default(body)) {
        return next();
    }
    var type = request.type();
    if (!type) {
        type = 'application/json';
        request.type(type);
    }
    try {
        if (JSON_MIME_REGEXP.test(type)) {
            request.body = JSON.stringify(body);
        }
        else if (FORM_MIME_REGEXP.test(type)) {
            request.body = form_1.default(body);
        }
        else if (QUERY_MIME_REGEXP.test(type)) {
            request.body = querystring_1.stringify(body);
        }
    }
    catch (err) {
        return Promise.reject(request.error('Unable to stringify request body: ' + err.message, 'ESTRINGIFY', err));
    }
    if (request.body instanceof FormData) {
        request.remove('Content-Type');
    }
    return next();
});
exports.parse = wrap(function (request, next) {
    return next()
        .then(function (response) {
        var body = response.body;
        if (typeof body !== 'string') {
            return response;
        }
        if (body === '') {
            response.body = null;
            return response;
        }
        var type = response.type();
        try {
            if (JSON_MIME_REGEXP.test(type)) {
                response.body = body === '' ? null : JSON.parse(body);
            }
            else if (QUERY_MIME_REGEXP.test(type)) {
                response.body = querystring_1.parse(body);
            }
        }
        catch (err) {
            return Promise.reject(request.error('Unable to parse response body: ' + err.message, 'EPARSE', err));
        }
        return response;
    });
});
//# sourceMappingURL=common.js.map