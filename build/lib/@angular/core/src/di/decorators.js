"use strict";
var decorators_1 = require('../util/decorators');
var metadata_1 = require('./metadata');
/**
 * Factory for creating {@link InjectMetadata}.
 * @stable
 */
exports.Inject = decorators_1.makeParamDecorator(metadata_1.InjectMetadata);
/**
 * Factory for creating {@link OptionalMetadata}.
 * @stable
 */
exports.Optional = decorators_1.makeParamDecorator(metadata_1.OptionalMetadata);
/**
 * Factory for creating {@link InjectableMetadata}.
 * @stable
 */
exports.Injectable = decorators_1.makeDecorator(metadata_1.InjectableMetadata);
/**
 * Factory for creating {@link SelfMetadata}.
 * @stable
 */
exports.Self = decorators_1.makeParamDecorator(metadata_1.SelfMetadata);
/**
 * Factory for creating {@link HostMetadata}.
 * @stable
 */
exports.Host = decorators_1.makeParamDecorator(metadata_1.HostMetadata);
/**
 * Factory for creating {@link SkipSelfMetadata}.
 * @stable
 */
exports.SkipSelf = decorators_1.makeParamDecorator(metadata_1.SkipSelfMetadata);
//# sourceMappingURL=decorators.js.map