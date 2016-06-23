'use strict';

var util = require('util');
var path = require('path');
var slash = require('slash');

var Block = function (config, file, match) {
    this.replacement = match[0];
    this.linefeed = match[1];
    this.indent = match[2];
    this.beginTag = match[3];
    this.taskName = match[4];
    this.originalContent = match[5];
    this.endTag = match[6];

    this.replacements = [];
    this.config = config;
    this.template = null;
    this.file = file;
};

Block.prototype.build = function () {
    if (!this.replacements.length) {
        return this.config.keepUnassigned ? [this.originalContent] : [];
    }

    // get the replacement strings and do replacements for extensions
    if (this.uniqueExts) {
        var extname = path.extname(this.file.path);
        var basename = path.basename(this.file.path, extname);

        if (this.uniqueExts['%f']) {
            this.uniqueExts['%f'].value = basename;
        }
        if (this.uniqueExts['%e']) {
            this.uniqueExts['%e'].value = extname;
        }

        Object.keys(this.uniqueExts).forEach(function (key) {
            var unique = this.uniqueExts[key];
            this.template = this.template.replace(unique.regex, unique.value);
        }.bind(this));
    }

    if (this.srcIsNull) {
        return [this.indent + this.template];
    }

    return this.replacements.map(function (replacement) {
        if (this.template) {
            if (Array.isArray(replacement)) {
                replacement.unshift(this.template);
                return this.indent + util.format.apply(util, replacement);
            } else {
                return this.indent + util.format(this.template, replacement);
            }
        }

        if (this.config.resolvePaths) {
            var replacementPath = path.resolve(this.file.cwd, replacement);
            replacement = path.relative(path.dirname(this.file.path), replacementPath);
            replacement = slash(replacement);
        }

        var ext = replacement.split('?')[0].toLowerCase().split('.').pop();

        if (ext === 'js') {
            return util.format('%s<script src="%s"></script>', this.indent, replacement);
        } else if (ext === 'css') {
            return util.format('%s<link rel="stylesheet" href="%s">', this.indent, replacement);
        }
        return this.indent + replacement;
    }.bind(this));
};

Block.prototype.compile = function (tasks) {
    var task = tasks[this.taskName];
    
    if (task) {
        this.replacements = task.src;
        this.template = task.tpl;
        this.uniqueExts = task.uni;
        this.srcIsNull = task.srcIsNull;
    }

    var buildResult = this.build();

    if (this.config.keepBlockTags) {
        buildResult.unshift(this.indent + this.beginTag);
        buildResult.push(this.indent + this.endTag);
    }

    buildResult.unshift(null);
    buildResult.push(null);

    return buildResult.join(this.linefeed);
};

module.exports = Block;
