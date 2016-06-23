"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var concat = require('concat-stream');
var FormData = require('form-data');
var zlib_1 = require('zlib');
var Promise = require('any-promise');
__export(require('./common'));
var common_2 = require('./common');
exports.unzip = common_2.wrap(function (request, next) {
    if (!request.get('Accept-Encoding')) {
        request.set('Accept-Encoding', 'gzip,deflate');
    }
    return next()
        .then(function (response) {
        var enc = response.get('Content-Encoding');
        if (enc === 'gzip' || enc === 'deflate') {
            var unzip_1 = zlib_1.createUnzip();
            response.body.pipe(unzip_1);
            response.body = unzip_1;
        }
        return response;
    });
});
function concatStream(encoding) {
    return function (request, next) {
        return next()
            .then(function (response) {
            return new Promise(function (resolve, reject) {
                var stream = concat({ encoding: encoding }, function (data) {
                    response.body = data;
                    return resolve(response);
                });
                response.body.on('error', reject);
                response.body.pipe(stream);
            });
        });
    };
}
exports.concatStream = concatStream;
function headers() {
    var common = common_2.headers();
    return function (request, next) {
        return common(request, function () {
            if (!request.get('User-Agent')) {
                request.set('User-Agent', 'https://github.com/blakeembrey/popsicle');
            }
            if (request.body instanceof FormData) {
                request.set('Content-Type', 'multipart/form-data; boundary=' + request.body.getBoundary());
                return new Promise(function (resolve, reject) {
                    request.body.getLength(function (err, length) {
                        if (err) {
                            request.set('Transfer-Encoding', 'chunked');
                        }
                        else {
                            request.set('Content-Length', String(length));
                        }
                        return resolve(next());
                    });
                });
            }
            var length = 0;
            var body = request.body;
            if (body && !request.get('Content-Length')) {
                if (Array.isArray(body)) {
                    for (var i = 0; i < body.length; i++) {
                        length += body[i].length;
                    }
                }
                else if (typeof body === 'string') {
                    length = Buffer.byteLength(body);
                }
                else {
                    length = body.length;
                }
                if (length) {
                    request.set('Content-Length', String(length));
                }
                else if (typeof body.pipe === 'function') {
                    request.set('Transfer-Encoding', 'chunked');
                }
                else {
                    return Promise.reject(request.error('Argument error, `options.body`', 'EBODY'));
                }
            }
            return next();
        });
    };
}
exports.headers = headers;
exports.defaults = [common_2.stringify(), headers(), common_2.parse(), concatStream('string'), exports.unzip()];
//# sourceMappingURL=index.js.map