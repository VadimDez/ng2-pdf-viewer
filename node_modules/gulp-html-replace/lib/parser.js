'use strict';

var util = require('util');
var Transform = require('readable-stream/transform');
var Block = require('./block');
var common = require('./common');

/**
 * 1 - newline
 * 2 - indentation
 * 3 - begin tag
 * 4 - task name
 * 5 - original content
 * 6 - end tag
 *
 * @type {RegExp}
 */
var regex = /(\n?)([ \t]*)(<!--\s*build:(\w+(?:-\w+)*)\s*-->)\n?([\s\S]*?)\n?(<!--\s*endbuild\s*-->)\n?/ig;

function Parser(tasks, config, file) {
    Transform.call(this);

    this.tasks = tasks;
    this.config = config;
    this.file = file;
}
util.inherits(Parser, Transform);

Parser.prototype._transform = function (chunk, enc, done) {
    var content = chunk.toString('utf8');

    var matches = common.regexMatchAll(content, regex);
    matches.forEach(function (match) {
        var block = new Block(this.config, this.file, match);
        content = content.replace(block.replacement, function () {
            return block.compile(this.tasks)
        }.bind(this));
    }.bind(this));

    done(null, content);
};

module.exports = Parser;
