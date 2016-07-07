import { ViewEncapsulation } from '@angular/core';
import { unimplemented } from '../src/facade/exceptions';
import { assertionsEnabled } from '../src/facade/lang';
import { Identifiers } from './identifiers';
export class CompilerConfig {
    constructor({ renderTypes = new DefaultRenderTypes(), defaultEncapsulation = ViewEncapsulation.Emulated, genDebugInfo = assertionsEnabled(), logBindingUpdate = assertionsEnabled(), useJit = true, platformDirectives = [], platformPipes = [] } = {}) {
        this.renderTypes = renderTypes;
        this.defaultEncapsulation = defaultEncapsulation;
        this.genDebugInfo = genDebugInfo;
        this.logBindingUpdate = logBindingUpdate;
        this.useJit = useJit;
        this.platformDirectives = platformDirectives;
        this.platformPipes = platformPipes;
    }
}
/**
 * Types used for the renderer.
 * Can be replaced to specialize the generated output to a specific renderer
 * to help tree shaking.
 */
export class RenderTypes {
    get renderer() { return unimplemented(); }
    get renderText() { return unimplemented(); }
    get renderElement() { return unimplemented(); }
    get renderComment() { return unimplemented(); }
    get renderNode() { return unimplemented(); }
    get renderEvent() { return unimplemented(); }
}
export class DefaultRenderTypes {
    constructor() {
        this.renderer = Identifiers.Renderer;
        this.renderText = null;
        this.renderElement = null;
        this.renderComment = null;
        this.renderNode = null;
        this.renderEvent = null;
    }
}
//# sourceMappingURL=config.js.map