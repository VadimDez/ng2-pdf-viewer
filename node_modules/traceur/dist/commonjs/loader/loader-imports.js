"use strict";
var $__Loader_46_js__,
    $__LoaderCompiler_46_js__,
    $__TraceurLoader_46_js__,
    $___46__46__47_node_47_NodeLoaderCompiler_46_js__,
    $__InlineLoaderCompiler_46_js__,
    $__NodeTraceurLoader_46_js__,
    $__TraceurLoader_46_js__;
var Loader = ($__Loader_46_js__ = require("./Loader.js"), $__Loader_46_js__ && $__Loader_46_js__.__esModule && $__Loader_46_js__ || {default: $__Loader_46_js__}).Loader;
var LoaderCompiler = ($__LoaderCompiler_46_js__ = require("./LoaderCompiler.js"), $__LoaderCompiler_46_js__ && $__LoaderCompiler_46_js__.__esModule && $__LoaderCompiler_46_js__ || {default: $__LoaderCompiler_46_js__}).LoaderCompiler;
var BrowserTraceurLoader = ($__TraceurLoader_46_js__ = require("./TraceurLoader.js"), $__TraceurLoader_46_js__ && $__TraceurLoader_46_js__.__esModule && $__TraceurLoader_46_js__ || {default: $__TraceurLoader_46_js__}).BrowserTraceurLoader;
var NodeLoaderCompiler = ($___46__46__47_node_47_NodeLoaderCompiler_46_js__ = require("../node/NodeLoaderCompiler.js"), $___46__46__47_node_47_NodeLoaderCompiler_46_js__ && $___46__46__47_node_47_NodeLoaderCompiler_46_js__.__esModule && $___46__46__47_node_47_NodeLoaderCompiler_46_js__ || {default: $___46__46__47_node_47_NodeLoaderCompiler_46_js__}).NodeLoaderCompiler;
var InlineLoaderCompiler = ($__InlineLoaderCompiler_46_js__ = require("./InlineLoaderCompiler.js"), $__InlineLoaderCompiler_46_js__ && $__InlineLoaderCompiler_46_js__.__esModule && $__InlineLoaderCompiler_46_js__ || {default: $__InlineLoaderCompiler_46_js__}).InlineLoaderCompiler;
var NodeTraceurLoader = ($__NodeTraceurLoader_46_js__ = require("./NodeTraceurLoader.js"), $__NodeTraceurLoader_46_js__ && $__NodeTraceurLoader_46_js__.__esModule && $__NodeTraceurLoader_46_js__ || {default: $__NodeTraceurLoader_46_js__}).NodeTraceurLoader;
var TraceurLoader = ($__TraceurLoader_46_js__ = require("./TraceurLoader.js"), $__TraceurLoader_46_js__ && $__TraceurLoader_46_js__.__esModule && $__TraceurLoader_46_js__ || {default: $__TraceurLoader_46_js__}).TraceurLoader;
var loader = {
  BrowserTraceurLoader: BrowserTraceurLoader,
  InlineLoaderCompiler: InlineLoaderCompiler,
  Loader: Loader,
  LoaderCompiler: LoaderCompiler,
  NodeLoaderCompiler: NodeLoaderCompiler,
  NodeTraceurLoader: NodeTraceurLoader,
  TraceurLoader: TraceurLoader
};
Object.defineProperties(module.exports, {
  loader: {get: function() {
      return loader;
    }},
  __esModule: {value: true}
});
