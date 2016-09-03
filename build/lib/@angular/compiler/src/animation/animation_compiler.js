/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { StringMapWrapper } from '../facade/collection';
import { isBlank, isPresent } from '../facade/lang';
import { Identifiers, resolveIdentifier } from '../identifiers';
import * as o from '../output/output_ast';
import { ANY_STATE, DEFAULT_STATE, EMPTY_STATE } from '../private_import_core';
import * as t from '../template_parser/template_ast';
import { AnimationStepAst } from './animation_ast';
import { AnimationParseError, parseAnimationEntry, parseAnimationOutputName } from './animation_parser';
var animationCompilationCache = new Map();
export var CompiledAnimationTriggerResult = (function () {
    function CompiledAnimationTriggerResult(name, statesMapStatement, statesVariableName, fnStatement, fnVariable) {
        this.name = name;
        this.statesMapStatement = statesMapStatement;
        this.statesVariableName = statesVariableName;
        this.fnStatement = fnStatement;
        this.fnVariable = fnVariable;
    }
    return CompiledAnimationTriggerResult;
}());
export var CompiledComponentAnimationResult = (function () {
    function CompiledComponentAnimationResult(outputs, triggers) {
        this.outputs = outputs;
        this.triggers = triggers;
    }
    return CompiledComponentAnimationResult;
}());
export var AnimationCompiler = (function () {
    function AnimationCompiler() {
    }
    AnimationCompiler.prototype.compileComponent = function (component, template) {
        var compiledAnimations = [];
        var groupedErrors = [];
        var triggerLookup = {};
        var componentName = component.type.name;
        component.template.animations.forEach(function (entry) {
            var result = parseAnimationEntry(entry);
            var triggerName = entry.name;
            if (result.errors.length > 0) {
                var errorMessage = "Unable to parse the animation sequence for \"" + triggerName + "\" due to the following errors:";
                result.errors.forEach(function (error) { errorMessage += '\n-- ' + error.msg; });
                groupedErrors.push(errorMessage);
            }
            if (triggerLookup[triggerName]) {
                groupedErrors.push("The animation trigger \"" + triggerName + "\" has already been registered on \"" + componentName + "\"");
            }
            else {
                var factoryName = componentName + "_" + entry.name;
                var visitor = new _AnimationBuilder(triggerName, factoryName);
                var compileResult = visitor.build(result.ast);
                compiledAnimations.push(compileResult);
                triggerLookup[entry.name] = compileResult;
            }
        });
        var validatedProperties = _validateAnimationProperties(compiledAnimations, template);
        validatedProperties.errors.forEach(function (error) { groupedErrors.push(error.msg); });
        if (groupedErrors.length > 0) {
            var errorMessageStr = "Animation parsing for " + component.type.name + " has failed due to the following errors:";
            groupedErrors.forEach(function (error) { return errorMessageStr += "\n- " + error; });
            throw new Error(errorMessageStr);
        }
        animationCompilationCache.set(component, compiledAnimations);
        return new CompiledComponentAnimationResult(validatedProperties.outputs, compiledAnimations);
    };
    return AnimationCompiler;
}());
var _ANIMATION_FACTORY_ELEMENT_VAR = o.variable('element');
var _ANIMATION_DEFAULT_STATE_VAR = o.variable('defaultStateStyles');
var _ANIMATION_FACTORY_VIEW_VAR = o.variable('view');
var _ANIMATION_FACTORY_RENDERER_VAR = _ANIMATION_FACTORY_VIEW_VAR.prop('renderer');
var _ANIMATION_CURRENT_STATE_VAR = o.variable('currentState');
var _ANIMATION_NEXT_STATE_VAR = o.variable('nextState');
var _ANIMATION_PLAYER_VAR = o.variable('player');
var _ANIMATION_TIME_VAR = o.variable('totalTime');
var _ANIMATION_START_STATE_STYLES_VAR = o.variable('startStateStyles');
var _ANIMATION_END_STATE_STYLES_VAR = o.variable('endStateStyles');
var _ANIMATION_COLLECTED_STYLES = o.variable('collectedStyles');
var EMPTY_MAP = o.literalMap([]);
var _AnimationBuilder = (function () {
    function _AnimationBuilder(animationName, factoryName) {
        this.animationName = animationName;
        this._fnVarName = factoryName + '_factory';
        this._statesMapVarName = factoryName + '_states';
        this._statesMapVar = o.variable(this._statesMapVarName);
    }
    _AnimationBuilder.prototype.visitAnimationStyles = function (ast, context) {
        var stylesArr = [];
        if (context.isExpectingFirstStyleStep) {
            stylesArr.push(_ANIMATION_START_STATE_STYLES_VAR);
            context.isExpectingFirstStyleStep = false;
        }
        ast.styles.forEach(function (entry) {
            stylesArr.push(o.literalMap(StringMapWrapper.keys(entry).map(function (key) { return [key, o.literal(entry[key])]; })));
        });
        return o.importExpr(resolveIdentifier(Identifiers.AnimationStyles)).instantiate([
            o.importExpr(resolveIdentifier(Identifiers.collectAndResolveStyles)).callFn([
                _ANIMATION_COLLECTED_STYLES, o.literalArr(stylesArr)
            ])
        ]);
    };
    _AnimationBuilder.prototype.visitAnimationKeyframe = function (ast, context) {
        return o.importExpr(resolveIdentifier(Identifiers.AnimationKeyframe)).instantiate([
            o.literal(ast.offset), ast.styles.visit(this, context)
        ]);
    };
    _AnimationBuilder.prototype.visitAnimationStep = function (ast, context) {
        var _this = this;
        if (context.endStateAnimateStep === ast) {
            return this._visitEndStateAnimation(ast, context);
        }
        var startingStylesExpr = ast.startingStyles.visit(this, context);
        var keyframeExpressions = ast.keyframes.map(function (keyframeEntry) { return keyframeEntry.visit(_this, context); });
        return this._callAnimateMethod(ast, startingStylesExpr, o.literalArr(keyframeExpressions), context);
    };
    /** @internal */
    _AnimationBuilder.prototype._visitEndStateAnimation = function (ast, context) {
        var _this = this;
        var startingStylesExpr = ast.startingStyles.visit(this, context);
        var keyframeExpressions = ast.keyframes.map(function (keyframe) { return keyframe.visit(_this, context); });
        var keyframesExpr = o.importExpr(resolveIdentifier(Identifiers.balanceAnimationKeyframes)).callFn([
            _ANIMATION_COLLECTED_STYLES, _ANIMATION_END_STATE_STYLES_VAR,
            o.literalArr(keyframeExpressions)
        ]);
        return this._callAnimateMethod(ast, startingStylesExpr, keyframesExpr, context);
    };
    /** @internal */
    _AnimationBuilder.prototype._callAnimateMethod = function (ast, startingStylesExpr, keyframesExpr, context) {
        context.totalTransitionTime += ast.duration + ast.delay;
        return _ANIMATION_FACTORY_RENDERER_VAR.callMethod('animate', [
            _ANIMATION_FACTORY_ELEMENT_VAR, startingStylesExpr, keyframesExpr, o.literal(ast.duration),
            o.literal(ast.delay), o.literal(ast.easing)
        ]);
    };
    _AnimationBuilder.prototype.visitAnimationSequence = function (ast, context) {
        var _this = this;
        var playerExprs = ast.steps.map(function (step) { return step.visit(_this, context); });
        return o.importExpr(resolveIdentifier(Identifiers.AnimationSequencePlayer)).instantiate([
            o.literalArr(playerExprs)
        ]);
    };
    _AnimationBuilder.prototype.visitAnimationGroup = function (ast, context) {
        var _this = this;
        var playerExprs = ast.steps.map(function (step) { return step.visit(_this, context); });
        return o.importExpr(resolveIdentifier(Identifiers.AnimationGroupPlayer)).instantiate([
            o.literalArr(playerExprs)
        ]);
    };
    _AnimationBuilder.prototype.visitAnimationStateDeclaration = function (ast, context) {
        var flatStyles = {};
        _getStylesArray(ast).forEach(function (entry) {
            StringMapWrapper.forEach(entry, function (value, key) { flatStyles[key] = value; });
        });
        context.stateMap.registerState(ast.stateName, flatStyles);
    };
    _AnimationBuilder.prototype.visitAnimationStateTransition = function (ast, context) {
        var steps = ast.animation.steps;
        var lastStep = steps[steps.length - 1];
        if (_isEndStateAnimateStep(lastStep)) {
            context.endStateAnimateStep = lastStep;
        }
        context.totalTransitionTime = 0;
        context.isExpectingFirstStyleStep = true;
        var stateChangePreconditions = [];
        ast.stateChanges.forEach(function (stateChange) {
            stateChangePreconditions.push(_compareToAnimationStateExpr(_ANIMATION_CURRENT_STATE_VAR, stateChange.fromState)
                .and(_compareToAnimationStateExpr(_ANIMATION_NEXT_STATE_VAR, stateChange.toState)));
            if (stateChange.fromState != ANY_STATE) {
                context.stateMap.registerState(stateChange.fromState);
            }
            if (stateChange.toState != ANY_STATE) {
                context.stateMap.registerState(stateChange.toState);
            }
        });
        var animationPlayerExpr = ast.animation.visit(this, context);
        var reducedStateChangesPrecondition = stateChangePreconditions.reduce(function (a, b) { return a.or(b); });
        var precondition = _ANIMATION_PLAYER_VAR.equals(o.NULL_EXPR).and(reducedStateChangesPrecondition);
        var animationStmt = _ANIMATION_PLAYER_VAR.set(animationPlayerExpr).toStmt();
        var totalTimeStmt = _ANIMATION_TIME_VAR.set(o.literal(context.totalTransitionTime)).toStmt();
        return new o.IfStmt(precondition, [animationStmt, totalTimeStmt]);
    };
    _AnimationBuilder.prototype.visitAnimationEntry = function (ast, context) {
        var _this = this;
        // visit each of the declarations first to build the context state map
        ast.stateDeclarations.forEach(function (def) { return def.visit(_this, context); });
        // this should always be defined even if the user overrides it
        context.stateMap.registerState(DEFAULT_STATE, {});
        var statements = [];
        statements.push(_ANIMATION_FACTORY_VIEW_VAR
            .callMethod('cancelActiveAnimation', [
            _ANIMATION_FACTORY_ELEMENT_VAR, o.literal(this.animationName),
            _ANIMATION_NEXT_STATE_VAR.equals(o.literal(EMPTY_STATE))
        ])
            .toStmt());
        statements.push(_ANIMATION_COLLECTED_STYLES.set(EMPTY_MAP).toDeclStmt());
        statements.push(_ANIMATION_PLAYER_VAR.set(o.NULL_EXPR).toDeclStmt());
        statements.push(_ANIMATION_TIME_VAR.set(o.literal(0)).toDeclStmt());
        statements.push(_ANIMATION_DEFAULT_STATE_VAR.set(this._statesMapVar.key(o.literal(DEFAULT_STATE)))
            .toDeclStmt());
        statements.push(_ANIMATION_START_STATE_STYLES_VAR.set(this._statesMapVar.key(_ANIMATION_CURRENT_STATE_VAR))
            .toDeclStmt());
        statements.push(new o.IfStmt(_ANIMATION_START_STATE_STYLES_VAR.equals(o.NULL_EXPR), [_ANIMATION_START_STATE_STYLES_VAR.set(_ANIMATION_DEFAULT_STATE_VAR).toStmt()]));
        statements.push(_ANIMATION_END_STATE_STYLES_VAR.set(this._statesMapVar.key(_ANIMATION_NEXT_STATE_VAR))
            .toDeclStmt());
        statements.push(new o.IfStmt(_ANIMATION_END_STATE_STYLES_VAR.equals(o.NULL_EXPR), [_ANIMATION_END_STATE_STYLES_VAR.set(_ANIMATION_DEFAULT_STATE_VAR).toStmt()]));
        var RENDER_STYLES_FN = o.importExpr(resolveIdentifier(Identifiers.renderStyles));
        // before we start any animation we want to clear out the starting
        // styles from the element's style property (since they were placed
        // there at the end of the last animation
        statements.push(RENDER_STYLES_FN
            .callFn([
            _ANIMATION_FACTORY_ELEMENT_VAR, _ANIMATION_FACTORY_RENDERER_VAR,
            o.importExpr(resolveIdentifier(Identifiers.clearStyles))
                .callFn([_ANIMATION_START_STATE_STYLES_VAR])
        ])
            .toStmt());
        ast.stateTransitions.forEach(function (transAst) { return statements.push(transAst.visit(_this, context)); });
        // this check ensures that the animation factory always returns a player
        // so that the onDone callback can be used for tracking
        statements.push(new o.IfStmt(_ANIMATION_PLAYER_VAR.equals(o.NULL_EXPR), [_ANIMATION_PLAYER_VAR
                .set(o.importExpr(resolveIdentifier(Identifiers.NoOpAnimationPlayer)).instantiate([]))
                .toStmt()]));
        // once complete we want to apply the styles on the element
        // since the destination state's values should persist once
        // the animation sequence has completed.
        statements.push(_ANIMATION_PLAYER_VAR
            .callMethod('onDone', [o.fn([], [RENDER_STYLES_FN
                    .callFn([
                    _ANIMATION_FACTORY_ELEMENT_VAR, _ANIMATION_FACTORY_RENDERER_VAR,
                    o.importExpr(resolveIdentifier(Identifiers.prepareFinalAnimationStyles))
                        .callFn([
                        _ANIMATION_START_STATE_STYLES_VAR, _ANIMATION_END_STATE_STYLES_VAR
                    ])
                ])
                    .toStmt()])])
            .toStmt());
        statements.push(_ANIMATION_FACTORY_VIEW_VAR
            .callMethod('queueAnimation', [
            _ANIMATION_FACTORY_ELEMENT_VAR, o.literal(this.animationName),
            _ANIMATION_PLAYER_VAR, _ANIMATION_TIME_VAR,
            _ANIMATION_CURRENT_STATE_VAR, _ANIMATION_NEXT_STATE_VAR
        ])
            .toStmt());
        return o.fn([
            new o.FnParam(_ANIMATION_FACTORY_VIEW_VAR.name, o.importType(resolveIdentifier(Identifiers.AppView), [o.DYNAMIC_TYPE])),
            new o.FnParam(_ANIMATION_FACTORY_ELEMENT_VAR.name, o.DYNAMIC_TYPE),
            new o.FnParam(_ANIMATION_CURRENT_STATE_VAR.name, o.DYNAMIC_TYPE),
            new o.FnParam(_ANIMATION_NEXT_STATE_VAR.name, o.DYNAMIC_TYPE)
        ], statements);
    };
    _AnimationBuilder.prototype.build = function (ast) {
        var context = new _AnimationBuilderContext();
        var fnStatement = ast.visit(this, context).toDeclStmt(this._fnVarName);
        var fnVariable = o.variable(this._fnVarName);
        var lookupMap = [];
        StringMapWrapper.forEach(context.stateMap.states, function (value, stateName) {
            var variableValue = EMPTY_MAP;
            if (isPresent(value)) {
                var styleMap_1 = [];
                StringMapWrapper.forEach(value, function (value, key) {
                    styleMap_1.push([key, o.literal(value)]);
                });
                variableValue = o.literalMap(styleMap_1);
            }
            lookupMap.push([stateName, variableValue]);
        });
        var compiledStatesMapExpr = this._statesMapVar.set(o.literalMap(lookupMap)).toDeclStmt();
        return new CompiledAnimationTriggerResult(this.animationName, compiledStatesMapExpr, this._statesMapVarName, fnStatement, fnVariable);
    };
    return _AnimationBuilder;
}());
var _AnimationBuilderContext = (function () {
    function _AnimationBuilderContext() {
        this.stateMap = new _AnimationBuilderStateMap();
        this.endStateAnimateStep = null;
        this.isExpectingFirstStyleStep = false;
        this.totalTransitionTime = 0;
    }
    return _AnimationBuilderContext;
}());
var _AnimationBuilderStateMap = (function () {
    function _AnimationBuilderStateMap() {
        this._states = {};
    }
    Object.defineProperty(_AnimationBuilderStateMap.prototype, "states", {
        get: function () { return this._states; },
        enumerable: true,
        configurable: true
    });
    _AnimationBuilderStateMap.prototype.registerState = function (name, value) {
        if (value === void 0) { value = null; }
        var existingEntry = this._states[name];
        if (isBlank(existingEntry)) {
            this._states[name] = value;
        }
    };
    return _AnimationBuilderStateMap;
}());
function _compareToAnimationStateExpr(value, animationState) {
    var emptyStateLiteral = o.literal(EMPTY_STATE);
    switch (animationState) {
        case EMPTY_STATE:
            return value.equals(emptyStateLiteral);
        case ANY_STATE:
            return o.literal(true);
        default:
            return value.equals(o.literal(animationState));
    }
}
function _isEndStateAnimateStep(step) {
    // the final animation step is characterized by having only TWO
    // keyframe values and it must have zero styles for both keyframes
    if (step instanceof AnimationStepAst && step.duration > 0 && step.keyframes.length == 2) {
        var styles1 = _getStylesArray(step.keyframes[0])[0];
        var styles2 = _getStylesArray(step.keyframes[1])[0];
        return StringMapWrapper.isEmpty(styles1) && StringMapWrapper.isEmpty(styles2);
    }
    return false;
}
function _getStylesArray(obj) {
    return obj.styles.styles;
}
function _validateAnimationProperties(compiledAnimations, template) {
    var visitor = new _AnimationTemplatePropertyVisitor(compiledAnimations);
    t.templateVisitAll(visitor, template);
    return new AnimationPropertyValidationOutput(visitor.outputs, visitor.errors);
}
export var AnimationPropertyValidationOutput = (function () {
    function AnimationPropertyValidationOutput(outputs, errors) {
        this.outputs = outputs;
        this.errors = errors;
    }
    return AnimationPropertyValidationOutput;
}());
var _AnimationTemplatePropertyVisitor = (function () {
    function _AnimationTemplatePropertyVisitor(animations) {
        this.errors = [];
        this.outputs = [];
        this._animationRegistry = this._buildCompileAnimationLookup(animations);
    }
    _AnimationTemplatePropertyVisitor.prototype._buildCompileAnimationLookup = function (animations) {
        var map = {};
        animations.forEach(function (entry) { map[entry.name] = true; });
        return map;
    };
    _AnimationTemplatePropertyVisitor.prototype._validateAnimationInputOutputPairs = function (inputAsts, outputAsts, animationRegistry, isHostLevel) {
        var _this = this;
        var detectedAnimationInputs = {};
        inputAsts.forEach(function (input) {
            if (input.type == t.PropertyBindingType.Animation) {
                var triggerName = input.name;
                if (isPresent(animationRegistry[triggerName])) {
                    detectedAnimationInputs[triggerName] = true;
                }
                else {
                    _this.errors.push(new AnimationParseError("Couldn't find an animation entry for " + triggerName));
                }
            }
        });
        outputAsts.forEach(function (output) {
            if (output.name[0] == '@') {
                var normalizedOutputData = parseAnimationOutputName(output.name.substr(1), _this.errors);
                var triggerName = normalizedOutputData.name;
                var triggerEventPhase = normalizedOutputData.phase;
                if (!animationRegistry[triggerName]) {
                    _this.errors.push(new AnimationParseError("Couldn't find the corresponding " + (isHostLevel ? 'host-level ' : '') + "animation trigger definition for (@" + triggerName + ")"));
                }
                else if (!detectedAnimationInputs[triggerName]) {
                    _this.errors.push(new AnimationParseError("Unable to listen on (@" + triggerName + "." + triggerEventPhase + ") because the animation trigger [@" + triggerName + "] isn't being used on the same element"));
                }
                else {
                    _this.outputs.push(normalizedOutputData);
                }
            }
        });
    };
    _AnimationTemplatePropertyVisitor.prototype.visitElement = function (ast, ctx) {
        this._validateAnimationInputOutputPairs(ast.inputs, ast.outputs, this._animationRegistry, false);
        var componentOnElement = ast.directives.find(function (directive) { return directive.directive.isComponent; });
        if (componentOnElement) {
            var cachedComponentAnimations = animationCompilationCache.get(componentOnElement.directive);
            if (cachedComponentAnimations) {
                this._validateAnimationInputOutputPairs(componentOnElement.hostProperties, componentOnElement.hostEvents, this._buildCompileAnimationLookup(cachedComponentAnimations), true);
            }
        }
        t.templateVisitAll(this, ast.children);
    };
    _AnimationTemplatePropertyVisitor.prototype.visitEmbeddedTemplate = function (ast, ctx) {
        t.templateVisitAll(this, ast.children);
    };
    _AnimationTemplatePropertyVisitor.prototype.visitEvent = function (ast, ctx) { };
    _AnimationTemplatePropertyVisitor.prototype.visitBoundText = function (ast, ctx) { };
    _AnimationTemplatePropertyVisitor.prototype.visitText = function (ast, ctx) { };
    _AnimationTemplatePropertyVisitor.prototype.visitNgContent = function (ast, ctx) { };
    _AnimationTemplatePropertyVisitor.prototype.visitAttr = function (ast, ctx) { };
    _AnimationTemplatePropertyVisitor.prototype.visitDirective = function (ast, ctx) { };
    _AnimationTemplatePropertyVisitor.prototype.visitReference = function (ast, ctx) { };
    _AnimationTemplatePropertyVisitor.prototype.visitVariable = function (ast, ctx) { };
    _AnimationTemplatePropertyVisitor.prototype.visitDirectiveProperty = function (ast, ctx) { };
    _AnimationTemplatePropertyVisitor.prototype.visitElementProperty = function (ast, ctx) { };
    return _AnimationTemplatePropertyVisitor;
}());
//# sourceMappingURL=animation_compiler.js.map