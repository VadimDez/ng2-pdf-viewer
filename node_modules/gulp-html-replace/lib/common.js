'use strict';

var Promise = require('bluebird');
var buffer = require('vinyl-buffer');

function isStream(obj) {
    return obj && typeof obj.pipe === 'function' && typeof obj.on === 'function';
}

/**
 * Takes the src property of the task configuration and deeply "resolves" any vinyl file stream in it by turning
 * it into a string.
 *
 * This function doesn't change the "arborescence" of the given value: all the forms with strings accepted
 * work with vinyl file streams.
 *
 * @returns {Promise}
 */
function resolveSrcString(srcProperty) {
    if (Array.isArray(srcProperty)) {
        // handle multiple tag replacement
        return Promise.all(srcProperty.map(function (item) {
            return resolveSrcString(item);
        }));
    } else if (isStream(srcProperty)) {
        return new Promise(function (resolve, reject) {
            var strings = [];

            srcProperty.pipe(buffer())
                .on('data', function (file) {
                    strings.push(file.contents.toString());
                })
                .on('error', function(error) {
                    reject(error);
                    this.end();
                })
                .once('end', function () {
                    resolve(strings);
                });
        });
    } else {
        return Promise.resolve(srcProperty);
    }
}

module.exports = {
    /**
     * tasks = {
     *     'task-name': {
     *         'src': [file1, file2],
     *         'tpl': '<script src="%s"></script>'
     *     },
     *     ....
     * }
     **/
    parseTasks: function (options) {
        options = options || {};

        var utilExtensions = /%f|%e/g;
        var tasksByNames = {};

        var tasksPromises = Object.keys(options).map(function (name) {

            var task = {
                src: [],
                tpl: null,
                uni: {},
                srcIsNull: false
            };

            return Promise
                .resolve()
                .then(function () {
                    var item = options[name];
                    var src = typeof item.src !== 'undefined' ? item.src : item;

                    return resolveSrcString(src)
                      .then(function(srcStrings) {
                          task.srcIsNull = srcStrings === null;
                          task.src = task.src.concat(srcStrings);
                          task.tpl = item.tpl;
                      });
                })
                .then(function () {
                    var result;

                    while (result = utilExtensions.exec(task.tpl)) {
                        var type = result[0];
                        var unique = {};

                        if (task.uni[type]) {
                            continue;
                        }

                        unique.regex = new RegExp(result[0], "g");
                        unique.value = null;
                        task.uni[type] = unique;
                    }
                })
                .then(function () {
                    tasksByNames[name] = task;
                });
        });

        return Promise.all(tasksPromises)
            .then(function() {
               return tasksByNames;
        });
    },

    regexMatchAll: function (string, regexp) {
        var matches = [];
        string.replace(regexp, function () {
            var arr = Array.prototype.slice.call(arguments);
            matches.push(arr);
        });
        return matches;
    }
};
