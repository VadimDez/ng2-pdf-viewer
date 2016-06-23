"use strict";
var fs = require('fs');
var traceur = require('./traceur.js');
var System = new traceur.loader.NodeTraceurLoader();
var traceurMap;
Reflect.global.System = System;
System.map = System.semverMap('traceur@' + System.version);
module.exports = System;
