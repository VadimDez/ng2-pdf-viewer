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

var _primitives = require("../../core/primitives.js");

var _core_utils = require("../../core/core_utils.js");

var _test_utils = require("./test_utils.js");

describe("core_utils", function () {
  describe("getInheritableProperty", function () {
    it("handles non-dictionary arguments", function () {
      expect((0, _core_utils.getInheritableProperty)({
        dict: null,
        key: "foo"
      })).toEqual(undefined);
      expect((0, _core_utils.getInheritableProperty)({
        dict: undefined,
        key: "foo"
      })).toEqual(undefined);
    });
    it("handles dictionaries that do not contain the property", function () {
      const emptyDict = new _primitives.Dict();
      expect((0, _core_utils.getInheritableProperty)({
        dict: emptyDict,
        key: "foo"
      })).toEqual(undefined);
      const filledDict = new _primitives.Dict();
      filledDict.set("bar", "baz");
      expect((0, _core_utils.getInheritableProperty)({
        dict: filledDict,
        key: "foo"
      })).toEqual(undefined);
    });
    it("fetches the property if it is not inherited", function () {
      const ref = _primitives.Ref.get(10, 0);

      const xref = new _test_utils.XRefMock([{
        ref,
        data: "quux"
      }]);
      const dict = new _primitives.Dict(xref);
      dict.set("foo", "bar");
      expect((0, _core_utils.getInheritableProperty)({
        dict,
        key: "foo"
      })).toEqual("bar");
      dict.set("baz", ["qux", ref]);
      expect((0, _core_utils.getInheritableProperty)({
        dict,
        key: "baz",
        getArray: true
      })).toEqual(["qux", "quux"]);
    });
    it("fetches the property if it is inherited and present on one level", function () {
      const ref = _primitives.Ref.get(10, 0);

      const xref = new _test_utils.XRefMock([{
        ref,
        data: "quux"
      }]);
      const firstDict = new _primitives.Dict(xref);
      const secondDict = new _primitives.Dict(xref);
      firstDict.set("Parent", secondDict);
      secondDict.set("foo", "bar");
      expect((0, _core_utils.getInheritableProperty)({
        dict: firstDict,
        key: "foo"
      })).toEqual("bar");
      secondDict.set("baz", ["qux", ref]);
      expect((0, _core_utils.getInheritableProperty)({
        dict: firstDict,
        key: "baz",
        getArray: true
      })).toEqual(["qux", "quux"]);
    });
    it("fetches the property if it is inherited and present on multiple levels", function () {
      const ref = _primitives.Ref.get(10, 0);

      const xref = new _test_utils.XRefMock([{
        ref,
        data: "quux"
      }]);
      const firstDict = new _primitives.Dict(xref);
      const secondDict = new _primitives.Dict(xref);
      firstDict.set("Parent", secondDict);
      firstDict.set("foo", "bar1");
      secondDict.set("foo", "bar2");
      expect((0, _core_utils.getInheritableProperty)({
        dict: firstDict,
        key: "foo"
      })).toEqual("bar1");
      expect((0, _core_utils.getInheritableProperty)({
        dict: firstDict,
        key: "foo",
        getArray: false,
        stopWhenFound: false
      })).toEqual(["bar1", "bar2"]);
      firstDict.set("baz", ["qux1", ref]);
      secondDict.set("baz", ["qux2", ref]);
      expect((0, _core_utils.getInheritableProperty)({
        dict: firstDict,
        key: "baz",
        getArray: true,
        stopWhenFound: false
      })).toEqual([["qux1", "quux"], ["qux2", "quux"]]);
    });
  });
  describe("toRomanNumerals", function () {
    it("handles invalid arguments", function () {
      for (const input of ["foo", -1, 0]) {
        expect(function () {
          (0, _core_utils.toRomanNumerals)(input);
        }).toThrow(new Error("The number should be a positive integer."));
      }
    });
    it("converts numbers to uppercase Roman numerals", function () {
      expect((0, _core_utils.toRomanNumerals)(1)).toEqual("I");
      expect((0, _core_utils.toRomanNumerals)(6)).toEqual("VI");
      expect((0, _core_utils.toRomanNumerals)(7)).toEqual("VII");
      expect((0, _core_utils.toRomanNumerals)(8)).toEqual("VIII");
      expect((0, _core_utils.toRomanNumerals)(10)).toEqual("X");
      expect((0, _core_utils.toRomanNumerals)(40)).toEqual("XL");
      expect((0, _core_utils.toRomanNumerals)(100)).toEqual("C");
      expect((0, _core_utils.toRomanNumerals)(500)).toEqual("D");
      expect((0, _core_utils.toRomanNumerals)(1000)).toEqual("M");
      expect((0, _core_utils.toRomanNumerals)(2019)).toEqual("MMXIX");
    });
    it("converts numbers to lowercase Roman numerals", function () {
      expect((0, _core_utils.toRomanNumerals)(1, true)).toEqual("i");
      expect((0, _core_utils.toRomanNumerals)(6, true)).toEqual("vi");
      expect((0, _core_utils.toRomanNumerals)(7, true)).toEqual("vii");
      expect((0, _core_utils.toRomanNumerals)(8, true)).toEqual("viii");
      expect((0, _core_utils.toRomanNumerals)(10, true)).toEqual("x");
      expect((0, _core_utils.toRomanNumerals)(40, true)).toEqual("xl");
      expect((0, _core_utils.toRomanNumerals)(100, true)).toEqual("c");
      expect((0, _core_utils.toRomanNumerals)(500, true)).toEqual("d");
      expect((0, _core_utils.toRomanNumerals)(1000, true)).toEqual("m");
      expect((0, _core_utils.toRomanNumerals)(2019, true)).toEqual("mmxix");
    });
  });
  describe("log2", function () {
    it("handles values smaller than/equal to zero", function () {
      expect((0, _core_utils.log2)(0)).toEqual(0);
      expect((0, _core_utils.log2)(-1)).toEqual(0);
    });
    it("handles values larger than zero", function () {
      expect((0, _core_utils.log2)(1)).toEqual(0);
      expect((0, _core_utils.log2)(2)).toEqual(1);
      expect((0, _core_utils.log2)(3)).toEqual(2);
      expect((0, _core_utils.log2)(3.14)).toEqual(2);
    });
  });
  describe("isWhiteSpace", function () {
    it("handles space characters", function () {
      expect((0, _core_utils.isWhiteSpace)(0x20)).toEqual(true);
      expect((0, _core_utils.isWhiteSpace)(0x09)).toEqual(true);
      expect((0, _core_utils.isWhiteSpace)(0x0d)).toEqual(true);
      expect((0, _core_utils.isWhiteSpace)(0x0a)).toEqual(true);
    });
    it("handles non-space characters", function () {
      expect((0, _core_utils.isWhiteSpace)(0x0b)).toEqual(false);
      expect((0, _core_utils.isWhiteSpace)(null)).toEqual(false);
      expect((0, _core_utils.isWhiteSpace)(undefined)).toEqual(false);
    });
  });
  describe("parseXFAPath", function () {
    it("should get a correctly parsed path", function () {
      const path = "foo.bar[12].oof[3].rab.FOO[123].BAR[456]";
      expect((0, _core_utils.parseXFAPath)(path)).toEqual([{
        name: "foo",
        pos: 0
      }, {
        name: "bar",
        pos: 12
      }, {
        name: "oof",
        pos: 3
      }, {
        name: "rab",
        pos: 0
      }, {
        name: "FOO",
        pos: 123
      }, {
        name: "BAR",
        pos: 456
      }]);
    });
  });
  describe("escapePDFName", function () {
    it("should escape PDF name", function () {
      expect((0, _core_utils.escapePDFName)("hello")).toEqual("hello");
      expect((0, _core_utils.escapePDFName)("\xfehello")).toEqual("#fehello");
      expect((0, _core_utils.escapePDFName)("he\xfell\xffo")).toEqual("he#fell#ffo");
      expect((0, _core_utils.escapePDFName)("\xfehe\xfell\xffo\xff")).toEqual("#fehe#fell#ffo#ff");
      expect((0, _core_utils.escapePDFName)("#h#e#l#l#o")).toEqual("#23h#23e#23l#23l#23o");
      expect((0, _core_utils.escapePDFName)("#()<>[]{}/%")).toEqual("#23#28#29#3c#3e#5b#5d#7b#7d#2f#25");
    });
  });
  describe("encodeToXmlString", function () {
    it("should get a correctly encoded string with some entities", function () {
      const str = "\"\u0397ell😂' & <W😂rld>";
      expect((0, _core_utils.encodeToXmlString)(str)).toEqual("&quot;&#x397;ell&#x1F602;&apos; &amp; &lt;W&#x1F602;rld&gt;");
    });
    it("should get a correctly encoded basic ascii string", function () {
      const str = "hello world";
      expect((0, _core_utils.encodeToXmlString)(str)).toEqual(str);
    });
  });
  describe("validateCSSFont", function () {
    it("Check font family", function () {
      const cssFontInfo = {
        fontFamily: `"blah blah " blah blah"`,
        fontWeight: 0,
        italicAngle: 0
      };
      expect((0, _core_utils.validateCSSFont)(cssFontInfo)).toEqual(false);
      cssFontInfo.fontFamily = `"blah blah \\" blah blah"`;
      expect((0, _core_utils.validateCSSFont)(cssFontInfo)).toEqual(true);
      cssFontInfo.fontFamily = `'blah blah ' blah blah'`;
      expect((0, _core_utils.validateCSSFont)(cssFontInfo)).toEqual(false);
      cssFontInfo.fontFamily = `'blah blah \\' blah blah'`;
      expect((0, _core_utils.validateCSSFont)(cssFontInfo)).toEqual(true);
      cssFontInfo.fontFamily = `"blah blah `;
      expect((0, _core_utils.validateCSSFont)(cssFontInfo)).toEqual(false);
      cssFontInfo.fontFamily = `blah blah"`;
      expect((0, _core_utils.validateCSSFont)(cssFontInfo)).toEqual(false);
      cssFontInfo.fontFamily = `'blah blah `;
      expect((0, _core_utils.validateCSSFont)(cssFontInfo)).toEqual(false);
      cssFontInfo.fontFamily = `blah blah'`;
      expect((0, _core_utils.validateCSSFont)(cssFontInfo)).toEqual(false);
      cssFontInfo.fontFamily = "blah blah blah";
      expect((0, _core_utils.validateCSSFont)(cssFontInfo)).toEqual(true);
      cssFontInfo.fontFamily = "blah 0blah blah";
      expect((0, _core_utils.validateCSSFont)(cssFontInfo)).toEqual(false);
      cssFontInfo.fontFamily = "blah blah -0blah";
      expect((0, _core_utils.validateCSSFont)(cssFontInfo)).toEqual(false);
      cssFontInfo.fontFamily = "blah blah --blah";
      expect((0, _core_utils.validateCSSFont)(cssFontInfo)).toEqual(false);
      cssFontInfo.fontFamily = "blah blah -blah";
      expect((0, _core_utils.validateCSSFont)(cssFontInfo)).toEqual(true);
      cssFontInfo.fontFamily = "blah fdqAJqjHJK23kl23__--Kj blah";
      expect((0, _core_utils.validateCSSFont)(cssFontInfo)).toEqual(true);
      cssFontInfo.fontFamily = "blah fdqAJqjH$JK23kl23__--Kj blah";
      expect((0, _core_utils.validateCSSFont)(cssFontInfo)).toEqual(false);
    });
    it("Check font weight", function () {
      const cssFontInfo = {
        fontFamily: "blah",
        fontWeight: 100,
        italicAngle: 0
      };
      (0, _core_utils.validateCSSFont)(cssFontInfo);
      expect(cssFontInfo.fontWeight).toEqual("100");
      cssFontInfo.fontWeight = "700";
      (0, _core_utils.validateCSSFont)(cssFontInfo);
      expect(cssFontInfo.fontWeight).toEqual("700");
      cssFontInfo.fontWeight = "normal";
      (0, _core_utils.validateCSSFont)(cssFontInfo);
      expect(cssFontInfo.fontWeight).toEqual("normal");
      cssFontInfo.fontWeight = 314;
      (0, _core_utils.validateCSSFont)(cssFontInfo);
      expect(cssFontInfo.fontWeight).toEqual("400");
    });
    it("Check italic angle", function () {
      const cssFontInfo = {
        fontFamily: "blah",
        fontWeight: 100,
        italicAngle: 10
      };
      (0, _core_utils.validateCSSFont)(cssFontInfo);
      expect(cssFontInfo.italicAngle).toEqual("10");
      cssFontInfo.italicAngle = -123;
      (0, _core_utils.validateCSSFont)(cssFontInfo);
      expect(cssFontInfo.italicAngle).toEqual("14");
      cssFontInfo.italicAngle = "91";
      (0, _core_utils.validateCSSFont)(cssFontInfo);
      expect(cssFontInfo.italicAngle).toEqual("14");
      cssFontInfo.italicAngle = 2.718;
      (0, _core_utils.validateCSSFont)(cssFontInfo);
      expect(cssFontInfo.italicAngle).toEqual("2.718");
    });
  });
});