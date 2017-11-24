"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var ts = require("typescript");
var bundler_1 = require("./bundler");
var index_writer_1 = require("./index_writer");
var DTS = /\.d\.ts$/;
var JS_EXT = /(\.js|)$/;
function createSyntheticIndexHost(delegate, syntheticIndex) {
    var normalSyntheticIndexName = path.normalize(syntheticIndex.name);
    var indexContent = syntheticIndex.content;
    var indexMetadata = syntheticIndex.metadata;
    var newHost = Object.create(delegate);
    newHost.fileExists = function (fileName) {
        return path.normalize(fileName) == normalSyntheticIndexName || delegate.fileExists(fileName);
    };
    newHost.readFile = function (fileName) {
        return path.normalize(fileName) == normalSyntheticIndexName ? indexContent :
            delegate.readFile(fileName);
    };
    newHost.getSourceFile =
        function (fileName, languageVersion, onError) {
            if (path.normalize(fileName) == normalSyntheticIndexName) {
                return ts.createSourceFile(fileName, indexContent, languageVersion, true);
            }
            return delegate.getSourceFile(fileName, languageVersion, onError);
        };
    newHost.writeFile =
        function (fileName, data, writeByteOrderMark, onError, sourceFiles) {
            delegate.writeFile(fileName, data, writeByteOrderMark, onError, sourceFiles);
            if (fileName.match(DTS) && sourceFiles && sourceFiles.length == 1 &&
                path.normalize(sourceFiles[0].fileName) == normalSyntheticIndexName) {
                // If we are writing the synthetic index, write the metadata along side.
                var metadataName = fileName.replace(DTS, '.metadata.json');
                fs.writeFileSync(metadataName, indexMetadata, { encoding: 'utf8' });
            }
        };
    return newHost;
}
function createBundleIndexHost(ngOptions, rootFiles, host) {
    var files = rootFiles.filter(function (f) { return !DTS.test(f); });
    if (files.length != 1) {
        return {
            host: host,
            errors: [{
                    file: null,
                    start: null,
                    length: null,
                    messageText: 'Angular compiler option "flatModuleIndex" requires one and only one .ts file in the "files" field.',
                    category: ts.DiagnosticCategory.Error,
                    code: 0
                }]
        };
    }
    var file = files[0];
    var indexModule = file.replace(/\.ts$/, '');
    var bundler = new bundler_1.MetadataBundler(indexModule, ngOptions.flatModuleId, new bundler_1.CompilerHostAdapter(host));
    var metadataBundle = bundler.getMetadataBundle();
    var metadata = JSON.stringify(metadataBundle.metadata);
    var name = path.join(path.dirname(indexModule), ngOptions.flatModuleOutFile.replace(JS_EXT, '.ts'));
    var libraryIndex = "./" + path.basename(indexModule);
    var content = index_writer_1.privateEntriesToIndex(libraryIndex, metadataBundle.privates);
    host = createSyntheticIndexHost(host, { name: name, content: content, metadata: metadata });
    return { host: host, indexName: name };
}
exports.createBundleIndexHost = createBundleIndexHost;
//# sourceMappingURL=bundle_index_host.js.map