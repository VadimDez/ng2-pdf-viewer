var fs = require('fs');
var path = require('path');
var glob = require('globby');
var extend = require('xtend');
var stripBom = require('strip-bom');
var parseJson = require('parse-json');
var Promise = require('pinkie-promise');
var uniq = require('array-uniq');
var stripComments = require('strip-json-comments');
var CONFIG_FILENAME = 'tsconfig.json';
function resolve(dir) {
    var configFile = path.resolve(dir, CONFIG_FILENAME);
    return fileExists(configFile)
        .then(function (exists) {
        if (exists) {
            return configFile;
        }
        var parentDir = path.dirname(dir);
        if (dir === parentDir) {
            return;
        }
        return resolve(parentDir);
    });
}
exports.resolve = resolve;
function resolveSync(dir) {
    var configFile = path.resolve(dir, CONFIG_FILENAME);
    if (fileExistsSync(configFile)) {
        return configFile;
    }
    var parentDir = path.dirname(dir);
    if (dir === parentDir) {
        return;
    }
    return resolveSync(parentDir);
}
exports.resolveSync = resolveSync;
function load(dir, options) {
    return resolve(dir)
        .then(function (filename) {
        if (!filename) {
            return Promise.reject(new Error('Unable to resolve config file'));
        }
        return readFile(filename, options);
    });
}
exports.load = load;
function loadSync(dir, options) {
    var filename = resolveSync(dir);
    if (!filename) {
        throw new Error('Unable to resolve config file');
    }
    return readFileSync(filename, options);
}
exports.loadSync = loadSync;
function readFile(filename, options) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filename, 'utf8', function (err, contents) {
            if (err) {
                return reject(err);
            }
            return resolve(parseFile(contents, filename, options));
        });
    });
}
exports.readFile = readFile;
function readFileSync(filename, options) {
    var contents = fs.readFileSync(filename, 'utf8');
    return parseFileSync(contents, filename, options);
}
exports.readFileSync = readFileSync;
function parseFile(contents, filename, options) {
    return new Promise(function (resolve) {
        return resolve(resolveConfig(parseContent(contents, filename), filename, options));
    });
}
exports.parseFile = parseFile;
function parseFileSync(contents, filename, options) {
    return resolveConfigSync(parseContent(contents, filename), filename, options);
}
exports.parseFileSync = parseFileSync;
function resolveConfig(data, filename, options) {
    var filesGlob = getGlob(data);
    if (filesGlob) {
        return glob(filesGlob, globOptions(filename))
            .then(function (files) { return sanitizeConfig(data, files, filename, options); });
    }
    return Promise.resolve(sanitizeConfig(data, data.files, filename, options));
}
exports.resolveConfig = resolveConfig;
function resolveConfigSync(data, filename, options) {
    var filesGlob = getGlob(data);
    if (filesGlob) {
        return sanitizeConfig(data, glob.sync(filesGlob, globOptions(filename)), filename, options);
    }
    return sanitizeConfig(data, data.files, filename, options);
}
exports.resolveConfigSync = resolveConfigSync;
function getGlob(data) {
    if (!Array.isArray(data.filesGlob) && Array.isArray(data.files)) {
        return;
    }
    var pattern = [];
    if (Array.isArray(data.filesGlob)) {
        pattern = data.filesGlob.slice();
    }
    if (Array.isArray(data.exclude)) {
        data.exclude.forEach(function (x) { return pattern.push("!" + x + "/**"); });
    }
    if (!pattern.some(function (x) { return x.charAt(0) !== '!'; })) {
        pattern.unshift('**/*.ts', '**/*.tsx');
    }
    return pattern;
}
function sanitizeConfig(data, rawFiles, filename, options) {
    if (options === void 0) { options = {}; }
    var dirname = path.dirname(filename);
    var sanitize = options.resolvePaths !== false;
    var filter = options.filterDefinitions === true;
    var compilerOptions = extend(options.compilerOptions, data.compilerOptions);
    var tsconfig = extend(data, { compilerOptions: compilerOptions });
    if (rawFiles != null) {
        var files = sanitize ? resolvePaths(rawFiles, dirname) : rawFiles;
        tsconfig.files = filter ? filterDefinitions(files) : files;
    }
    if (data.exclude != null) {
        tsconfig.exclude = sanitize ? resolvePaths(data.exclude, dirname) : data.exclude;
    }
    return tsconfig;
}
function filterDefinitions(files) {
    return Array.isArray(files) ? files.filter(function (x) { return /\.d\.ts$/.test(x); }) : files;
}
function fileExists(filename) {
    return new Promise(function (resolve, reject) {
        fs.stat(filename, function (err, stats) {
            return err ? resolve(false) : resolve(stats.isFile() || stats.isFIFO());
        });
    });
}
function fileExistsSync(filename) {
    try {
        var stats = fs.statSync(filename);
        return stats.isFile() || stats.isFIFO();
    }
    catch (e) {
        return false;
    }
}
function resolvePaths(paths, dirname) {
    return paths ? uniq(paths.map(function (x) { return path.resolve(dirname, x); })) : undefined;
}
function globOptions(filename) {
    return {
        cache: {},
        statCache: {},
        realpathCache: {},
        symlinks: {},
        nodir: true,
        follow: true,
        cwd: path.dirname(filename)
    };
}
function parseContent(contents, filename) {
    var data = stripComments(stripBom(contents));
    if (/^\s*$/.test(data)) {
        return {};
    }
    return parseJson(data, null, filename);
}
//# sourceMappingURL=tsconfig.js.map