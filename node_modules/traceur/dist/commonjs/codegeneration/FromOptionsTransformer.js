"use strict";
var $__AmdTransformer_46_js__,
    $__AnnotationsTransformer_46_js__,
    $__ArrayComprehensionTransformer_46_js__,
    $__ArrowFunctionTransformer_46_js__,
    $__AsyncGeneratorTransformPass_46_js__,
    $__BlockBindingTransformer_46_js__,
    $__ClassTransformer_46_js__,
    $__ClosureModuleTransformer_46_js__,
    $__CommonJsModuleTransformer_46_js__,
    $__DefaultParametersTransformer_46_js__,
    $__DestructuringTransformer_46_js__,
    $__ExponentiationTransformer_46_js__,
    $__ForOfTransformer_46_js__,
    $__ForOnTransformer_46_js__,
    $__GeneratorComprehensionTransformer_46_js__,
    $__GeneratorTransformPass_46_js__,
    $__InlineModuleTransformer_46_js__,
    $__InstantiateModuleTransformer_46_js__,
    $__JsxTransformer_46_js__,
    $__MemberVariableTransformer_46_js__,
    $__ModuleTransformer_46_js__,
    $__MultiTransformer_46_js__,
    $__NumericLiteralTransformer_46_js__,
    $__ObjectLiteralTransformer_46_js__,
    $__ProperTailCallTransformer_46_js__,
    $__PropertyNameShorthandTransformer_46_js__,
    $__RegularExpressionTransformer_46_js__,
    $__RestParameterTransformer_46_js__,
    $__SpreadPropertiesTransformer_46_js__,
    $__SpreadTransformer_46_js__,
    $__SuperTransformer_46_js__,
    $__SymbolTransformer_46_js__,
    $__TemplateLiteralTransformer_46_js__,
    $__TypeToExpressionTransformer_46_js__,
    $__TypeTransformer_46_js__,
    $__UnicodeEscapeSequenceTransformer_46_js__,
    $__UniqueIdentifierGenerator_46_js__,
    $___46__46__47_semantics_47_ConstChecker_46_js__,
    $___46__46__47_semantics_47_FreeVariableChecker_46_js__;
var AmdTransformer = ($__AmdTransformer_46_js__ = require("./AmdTransformer.js"), $__AmdTransformer_46_js__ && $__AmdTransformer_46_js__.__esModule && $__AmdTransformer_46_js__ || {default: $__AmdTransformer_46_js__}).AmdTransformer;
var AnnotationsTransformer = ($__AnnotationsTransformer_46_js__ = require("./AnnotationsTransformer.js"), $__AnnotationsTransformer_46_js__ && $__AnnotationsTransformer_46_js__.__esModule && $__AnnotationsTransformer_46_js__ || {default: $__AnnotationsTransformer_46_js__}).AnnotationsTransformer;
var ArrayComprehensionTransformer = ($__ArrayComprehensionTransformer_46_js__ = require("./ArrayComprehensionTransformer.js"), $__ArrayComprehensionTransformer_46_js__ && $__ArrayComprehensionTransformer_46_js__.__esModule && $__ArrayComprehensionTransformer_46_js__ || {default: $__ArrayComprehensionTransformer_46_js__}).ArrayComprehensionTransformer;
var ArrowFunctionTransformer = ($__ArrowFunctionTransformer_46_js__ = require("./ArrowFunctionTransformer.js"), $__ArrowFunctionTransformer_46_js__ && $__ArrowFunctionTransformer_46_js__.__esModule && $__ArrowFunctionTransformer_46_js__ || {default: $__ArrowFunctionTransformer_46_js__}).ArrowFunctionTransformer;
var AsyncGeneratorTransformPass = ($__AsyncGeneratorTransformPass_46_js__ = require("./AsyncGeneratorTransformPass.js"), $__AsyncGeneratorTransformPass_46_js__ && $__AsyncGeneratorTransformPass_46_js__.__esModule && $__AsyncGeneratorTransformPass_46_js__ || {default: $__AsyncGeneratorTransformPass_46_js__}).AsyncGeneratorTransformPass;
var BlockBindingTransformer = ($__BlockBindingTransformer_46_js__ = require("./BlockBindingTransformer.js"), $__BlockBindingTransformer_46_js__ && $__BlockBindingTransformer_46_js__.__esModule && $__BlockBindingTransformer_46_js__ || {default: $__BlockBindingTransformer_46_js__}).BlockBindingTransformer;
var ClassTransformer = ($__ClassTransformer_46_js__ = require("./ClassTransformer.js"), $__ClassTransformer_46_js__ && $__ClassTransformer_46_js__.__esModule && $__ClassTransformer_46_js__ || {default: $__ClassTransformer_46_js__}).ClassTransformer;
var ClosureModuleTransformer = ($__ClosureModuleTransformer_46_js__ = require("./ClosureModuleTransformer.js"), $__ClosureModuleTransformer_46_js__ && $__ClosureModuleTransformer_46_js__.__esModule && $__ClosureModuleTransformer_46_js__ || {default: $__ClosureModuleTransformer_46_js__}).ClosureModuleTransformer;
var CommonJsModuleTransformer = ($__CommonJsModuleTransformer_46_js__ = require("./CommonJsModuleTransformer.js"), $__CommonJsModuleTransformer_46_js__ && $__CommonJsModuleTransformer_46_js__.__esModule && $__CommonJsModuleTransformer_46_js__ || {default: $__CommonJsModuleTransformer_46_js__}).CommonJsModuleTransformer;
var DefaultParametersTransformer = ($__DefaultParametersTransformer_46_js__ = require("./DefaultParametersTransformer.js"), $__DefaultParametersTransformer_46_js__ && $__DefaultParametersTransformer_46_js__.__esModule && $__DefaultParametersTransformer_46_js__ || {default: $__DefaultParametersTransformer_46_js__}).DefaultParametersTransformer;
var DestructuringTransformer = ($__DestructuringTransformer_46_js__ = require("./DestructuringTransformer.js"), $__DestructuringTransformer_46_js__ && $__DestructuringTransformer_46_js__.__esModule && $__DestructuringTransformer_46_js__ || {default: $__DestructuringTransformer_46_js__}).DestructuringTransformer;
var ExponentiationTransformer = ($__ExponentiationTransformer_46_js__ = require("./ExponentiationTransformer.js"), $__ExponentiationTransformer_46_js__ && $__ExponentiationTransformer_46_js__.__esModule && $__ExponentiationTransformer_46_js__ || {default: $__ExponentiationTransformer_46_js__}).ExponentiationTransformer;
var ForOfTransformer = ($__ForOfTransformer_46_js__ = require("./ForOfTransformer.js"), $__ForOfTransformer_46_js__ && $__ForOfTransformer_46_js__.__esModule && $__ForOfTransformer_46_js__ || {default: $__ForOfTransformer_46_js__}).ForOfTransformer;
var ForOnTransformer = ($__ForOnTransformer_46_js__ = require("./ForOnTransformer.js"), $__ForOnTransformer_46_js__ && $__ForOnTransformer_46_js__.__esModule && $__ForOnTransformer_46_js__ || {default: $__ForOnTransformer_46_js__}).ForOnTransformer;
var GeneratorComprehensionTransformer = ($__GeneratorComprehensionTransformer_46_js__ = require("./GeneratorComprehensionTransformer.js"), $__GeneratorComprehensionTransformer_46_js__ && $__GeneratorComprehensionTransformer_46_js__.__esModule && $__GeneratorComprehensionTransformer_46_js__ || {default: $__GeneratorComprehensionTransformer_46_js__}).GeneratorComprehensionTransformer;
var GeneratorTransformPass = ($__GeneratorTransformPass_46_js__ = require("./GeneratorTransformPass.js"), $__GeneratorTransformPass_46_js__ && $__GeneratorTransformPass_46_js__.__esModule && $__GeneratorTransformPass_46_js__ || {default: $__GeneratorTransformPass_46_js__}).GeneratorTransformPass;
var InlineModuleTransformer = ($__InlineModuleTransformer_46_js__ = require("./InlineModuleTransformer.js"), $__InlineModuleTransformer_46_js__ && $__InlineModuleTransformer_46_js__.__esModule && $__InlineModuleTransformer_46_js__ || {default: $__InlineModuleTransformer_46_js__}).InlineModuleTransformer;
var InstantiateModuleTransformer = ($__InstantiateModuleTransformer_46_js__ = require("./InstantiateModuleTransformer.js"), $__InstantiateModuleTransformer_46_js__ && $__InstantiateModuleTransformer_46_js__.__esModule && $__InstantiateModuleTransformer_46_js__ || {default: $__InstantiateModuleTransformer_46_js__}).InstantiateModuleTransformer;
var JsxTransformer = ($__JsxTransformer_46_js__ = require("./JsxTransformer.js"), $__JsxTransformer_46_js__ && $__JsxTransformer_46_js__.__esModule && $__JsxTransformer_46_js__ || {default: $__JsxTransformer_46_js__}).JsxTransformer;
var MemberVariableTransformer = ($__MemberVariableTransformer_46_js__ = require("./MemberVariableTransformer.js"), $__MemberVariableTransformer_46_js__ && $__MemberVariableTransformer_46_js__.__esModule && $__MemberVariableTransformer_46_js__ || {default: $__MemberVariableTransformer_46_js__}).MemberVariableTransformer;
var ModuleTransformer = ($__ModuleTransformer_46_js__ = require("./ModuleTransformer.js"), $__ModuleTransformer_46_js__ && $__ModuleTransformer_46_js__.__esModule && $__ModuleTransformer_46_js__ || {default: $__ModuleTransformer_46_js__}).ModuleTransformer;
var MultiTransformer = ($__MultiTransformer_46_js__ = require("./MultiTransformer.js"), $__MultiTransformer_46_js__ && $__MultiTransformer_46_js__.__esModule && $__MultiTransformer_46_js__ || {default: $__MultiTransformer_46_js__}).MultiTransformer;
var NumericLiteralTransformer = ($__NumericLiteralTransformer_46_js__ = require("./NumericLiteralTransformer.js"), $__NumericLiteralTransformer_46_js__ && $__NumericLiteralTransformer_46_js__.__esModule && $__NumericLiteralTransformer_46_js__ || {default: $__NumericLiteralTransformer_46_js__}).NumericLiteralTransformer;
var ObjectLiteralTransformer = ($__ObjectLiteralTransformer_46_js__ = require("./ObjectLiteralTransformer.js"), $__ObjectLiteralTransformer_46_js__ && $__ObjectLiteralTransformer_46_js__.__esModule && $__ObjectLiteralTransformer_46_js__ || {default: $__ObjectLiteralTransformer_46_js__}).ObjectLiteralTransformer;
var ProperTailCallTransformer = ($__ProperTailCallTransformer_46_js__ = require("./ProperTailCallTransformer.js"), $__ProperTailCallTransformer_46_js__ && $__ProperTailCallTransformer_46_js__.__esModule && $__ProperTailCallTransformer_46_js__ || {default: $__ProperTailCallTransformer_46_js__}).ProperTailCallTransformer;
var PropertyNameShorthandTransformer = ($__PropertyNameShorthandTransformer_46_js__ = require("./PropertyNameShorthandTransformer.js"), $__PropertyNameShorthandTransformer_46_js__ && $__PropertyNameShorthandTransformer_46_js__.__esModule && $__PropertyNameShorthandTransformer_46_js__ || {default: $__PropertyNameShorthandTransformer_46_js__}).PropertyNameShorthandTransformer;
var RegularExpressionTransformer = ($__RegularExpressionTransformer_46_js__ = require("./RegularExpressionTransformer.js"), $__RegularExpressionTransformer_46_js__ && $__RegularExpressionTransformer_46_js__.__esModule && $__RegularExpressionTransformer_46_js__ || {default: $__RegularExpressionTransformer_46_js__}).RegularExpressionTransformer;
var RestParameterTransformer = ($__RestParameterTransformer_46_js__ = require("./RestParameterTransformer.js"), $__RestParameterTransformer_46_js__ && $__RestParameterTransformer_46_js__.__esModule && $__RestParameterTransformer_46_js__ || {default: $__RestParameterTransformer_46_js__}).RestParameterTransformer;
var SpreadPropertiesTransformer = ($__SpreadPropertiesTransformer_46_js__ = require("./SpreadPropertiesTransformer.js"), $__SpreadPropertiesTransformer_46_js__ && $__SpreadPropertiesTransformer_46_js__.__esModule && $__SpreadPropertiesTransformer_46_js__ || {default: $__SpreadPropertiesTransformer_46_js__}).SpreadPropertiesTransformer;
var SpreadTransformer = ($__SpreadTransformer_46_js__ = require("./SpreadTransformer.js"), $__SpreadTransformer_46_js__ && $__SpreadTransformer_46_js__.__esModule && $__SpreadTransformer_46_js__ || {default: $__SpreadTransformer_46_js__}).SpreadTransformer;
var SuperTransformer = ($__SuperTransformer_46_js__ = require("./SuperTransformer.js"), $__SuperTransformer_46_js__ && $__SuperTransformer_46_js__.__esModule && $__SuperTransformer_46_js__ || {default: $__SuperTransformer_46_js__}).SuperTransformer;
var SymbolTransformer = ($__SymbolTransformer_46_js__ = require("./SymbolTransformer.js"), $__SymbolTransformer_46_js__ && $__SymbolTransformer_46_js__.__esModule && $__SymbolTransformer_46_js__ || {default: $__SymbolTransformer_46_js__}).SymbolTransformer;
var TemplateLiteralTransformer = ($__TemplateLiteralTransformer_46_js__ = require("./TemplateLiteralTransformer.js"), $__TemplateLiteralTransformer_46_js__ && $__TemplateLiteralTransformer_46_js__.__esModule && $__TemplateLiteralTransformer_46_js__ || {default: $__TemplateLiteralTransformer_46_js__}).TemplateLiteralTransformer;
var TypeToExpressionTransformer = ($__TypeToExpressionTransformer_46_js__ = require("./TypeToExpressionTransformer.js"), $__TypeToExpressionTransformer_46_js__ && $__TypeToExpressionTransformer_46_js__.__esModule && $__TypeToExpressionTransformer_46_js__ || {default: $__TypeToExpressionTransformer_46_js__}).TypeToExpressionTransformer;
var TypeTransformer = ($__TypeTransformer_46_js__ = require("./TypeTransformer.js"), $__TypeTransformer_46_js__ && $__TypeTransformer_46_js__.__esModule && $__TypeTransformer_46_js__ || {default: $__TypeTransformer_46_js__}).TypeTransformer;
var UnicodeEscapeSequenceTransformer = ($__UnicodeEscapeSequenceTransformer_46_js__ = require("./UnicodeEscapeSequenceTransformer.js"), $__UnicodeEscapeSequenceTransformer_46_js__ && $__UnicodeEscapeSequenceTransformer_46_js__.__esModule && $__UnicodeEscapeSequenceTransformer_46_js__ || {default: $__UnicodeEscapeSequenceTransformer_46_js__}).UnicodeEscapeSequenceTransformer;
var UniqueIdentifierGenerator = ($__UniqueIdentifierGenerator_46_js__ = require("./UniqueIdentifierGenerator.js"), $__UniqueIdentifierGenerator_46_js__ && $__UniqueIdentifierGenerator_46_js__.__esModule && $__UniqueIdentifierGenerator_46_js__ || {default: $__UniqueIdentifierGenerator_46_js__}).UniqueIdentifierGenerator;
var validateConst = ($___46__46__47_semantics_47_ConstChecker_46_js__ = require("../semantics/ConstChecker.js"), $___46__46__47_semantics_47_ConstChecker_46_js__ && $___46__46__47_semantics_47_ConstChecker_46_js__.__esModule && $___46__46__47_semantics_47_ConstChecker_46_js__ || {default: $___46__46__47_semantics_47_ConstChecker_46_js__}).validate;
var validateFreeVariables = ($___46__46__47_semantics_47_FreeVariableChecker_46_js__ = require("../semantics/FreeVariableChecker.js"), $___46__46__47_semantics_47_FreeVariableChecker_46_js__ && $___46__46__47_semantics_47_FreeVariableChecker_46_js__.__esModule && $___46__46__47_semantics_47_FreeVariableChecker_46_js__ || {default: $___46__46__47_semantics_47_FreeVariableChecker_46_js__}).validate;
var FromOptionsTransformer = function($__super) {
  function FromOptionsTransformer(reporter, options) {
    var $__42;
    $traceurRuntime.superConstructor(FromOptionsTransformer).call(this, reporter, options.validate);
    var transformOptions = options.transformOptions;
    var idGenerator = new UniqueIdentifierGenerator();
    var append = ($__42 = this, function(transformer) {
      $__42.append(function(tree) {
        return new transformer(idGenerator, reporter, options).transformAny(tree);
      });
    });
    if (transformOptions.blockBinding) {
      this.append(function(tree) {
        validateConst(tree, reporter);
        return tree;
      });
    }
    if (options.freeVariableChecker) {
      this.append(function(tree) {
        validateFreeVariables(tree, reporter);
        return tree;
      });
    }
    if (transformOptions.exponentiation)
      append(ExponentiationTransformer);
    if (transformOptions.numericLiterals)
      append(NumericLiteralTransformer);
    if (transformOptions.unicodeExpressions)
      append(RegularExpressionTransformer);
    if (transformOptions.jsx) {
      append(JsxTransformer);
    }
    if (transformOptions.templateLiterals)
      append(TemplateLiteralTransformer);
    if (transformOptions.types && transformOptions.annotations) {
      append(TypeToExpressionTransformer);
    }
    if (transformOptions.unicodeEscapeSequences)
      append(UnicodeEscapeSequenceTransformer);
    if (transformOptions.annotations)
      append(AnnotationsTransformer);
    if (transformOptions.propertyNameShorthand)
      append(PropertyNameShorthandTransformer);
    if (transformOptions.modules) {
      switch (transformOptions.modules) {
        case 'commonjs':
          append(CommonJsModuleTransformer);
          break;
        case 'amd':
          append(AmdTransformer);
          break;
        case 'closure':
          append(ClosureModuleTransformer);
          break;
        case 'inline':
          append(InlineModuleTransformer);
          break;
        case 'instantiate':
          append(InstantiateModuleTransformer);
          break;
        case 'bootstrap':
          append(ModuleTransformer);
          break;
        case 'parse':
          break;
        default:
          throw new Error('Invalid modules transform option');
      }
    }
    if (transformOptions.memberVariables) {
      append(MemberVariableTransformer);
    }
    if (transformOptions.classes) {
      append(SuperTransformer);
    }
    if (transformOptions.arrowFunctions) {
      append(ArrowFunctionTransformer);
    }
    if (transformOptions.classes) {
      append(ClassTransformer);
    }
    if (transformOptions.spreadProperties) {
      append(SpreadPropertiesTransformer);
    }
    if (transformOptions.propertyMethods || transformOptions.computedPropertyNames || transformOptions.properTailCalls) {
      append(ObjectLiteralTransformer);
    }
    if (transformOptions.generatorComprehension)
      append(GeneratorComprehensionTransformer);
    if (transformOptions.arrayComprehension)
      append(ArrayComprehensionTransformer);
    if (transformOptions.forOf)
      append(ForOfTransformer);
    if (transformOptions.asyncGenerators) {
      append(AsyncGeneratorTransformPass);
    }
    if (transformOptions.forOn)
      append(ForOnTransformer);
    if (transformOptions.restParameters)
      append(RestParameterTransformer);
    if (transformOptions.defaultParameters)
      append(DefaultParametersTransformer);
    if (transformOptions.destructuring)
      append(DestructuringTransformer);
    if (transformOptions.types)
      append(TypeTransformer);
    if (transformOptions.spread)
      append(SpreadTransformer);
    if (transformOptions.blockBinding) {
      this.append(function(tree) {
        var transformer = new BlockBindingTransformer(idGenerator, reporter, tree);
        return transformer.transformAny(tree);
      });
    }
    if (transformOptions.generators || transformOptions.asyncFunctions)
      append(GeneratorTransformPass);
    if (transformOptions.symbols)
      append(SymbolTransformer);
    if (transformOptions.properTailCalls) {
      append(ProperTailCallTransformer);
    }
  }
  return ($traceurRuntime.createClass)(FromOptionsTransformer, {}, {}, $__super);
}(MultiTransformer);
Object.defineProperties(module.exports, {
  FromOptionsTransformer: {get: function() {
      return FromOptionsTransformer;
    }},
  __esModule: {value: true}
});
