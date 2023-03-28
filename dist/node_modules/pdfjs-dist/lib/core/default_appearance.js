/**
 * @licstart The following is the entire license notice for the
 * JavaScript code in this page
 *
 * Copyright 2022 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @licend The above is the entire license notice for the
 * JavaScript code in this page
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDefaultAppearance = createDefaultAppearance;
exports.parseDefaultAppearance = parseDefaultAppearance;

var _util = require("../shared/util.js");

var _colorspace = require("./colorspace.js");

var _core_utils = require("./core_utils.js");

var _evaluator = require("./evaluator.js");

var _primitives = require("./primitives.js");

var _stream = require("./stream.js");

class DefaultAppearanceEvaluator extends _evaluator.EvaluatorPreprocessor {
  constructor(str) {
    super(new _stream.StringStream(str));
  }

  parse() {
    const operation = {
      fn: 0,
      args: []
    };
    const result = {
      fontSize: 0,
      fontName: "",
      fontColor: new Uint8ClampedArray(3)
    };

    try {
      while (true) {
        operation.args.length = 0;

        if (!this.read(operation)) {
          break;
        }

        if (this.savedStatesDepth !== 0) {
          continue;
        }

        const {
          fn,
          args
        } = operation;

        switch (fn | 0) {
          case _util.OPS.setFont:
            const [fontName, fontSize] = args;

            if (fontName instanceof _primitives.Name) {
              result.fontName = fontName.name;
            }

            if (typeof fontSize === "number" && fontSize > 0) {
              result.fontSize = fontSize;
            }

            break;

          case _util.OPS.setFillRGBColor:
            _colorspace.ColorSpace.singletons.rgb.getRgbItem(args, 0, result.fontColor, 0);

            break;

          case _util.OPS.setFillGray:
            _colorspace.ColorSpace.singletons.gray.getRgbItem(args, 0, result.fontColor, 0);

            break;

          case _util.OPS.setFillColorSpace:
            _colorspace.ColorSpace.singletons.cmyk.getRgbItem(args, 0, result.fontColor, 0);

            break;
        }
      }
    } catch (reason) {
      (0, _util.warn)(`parseDefaultAppearance - ignoring errors: "${reason}".`);
    }

    return result;
  }

}

function parseDefaultAppearance(str) {
  return new DefaultAppearanceEvaluator(str).parse();
}

function createDefaultAppearance({
  fontSize,
  fontName,
  fontColor
}) {
  let colorCmd;

  if (fontColor.every(c => c === 0)) {
    colorCmd = "0 g";
  } else {
    colorCmd = Array.from(fontColor).map(c => (c / 255).toFixed(2)).join(" ") + " rg";
  }

  return `/${(0, _core_utils.escapePDFName)(fontName)} ${fontSize} Tf ${colorCmd}`;
}