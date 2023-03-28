export class FontFaceObject {
    constructor(translatedData: any, { isEvalSupported, disableFontFace, ignoreErrors, onUnsupportedFeature, fontRegistry, }: {
        isEvalSupported?: boolean | undefined;
        disableFontFace?: boolean | undefined;
        ignoreErrors?: boolean | undefined;
        onUnsupportedFeature: any;
        fontRegistry?: null | undefined;
    });
    compiledGlyphs: any;
    isEvalSupported: boolean;
    disableFontFace: boolean;
    ignoreErrors: boolean;
    _onUnsupportedFeature: any;
    fontRegistry: any;
    createNativeFontFace(): FontFace | null;
    createFontFaceRule(): string | null;
    getPathGenerator(objs: any, character: any): any;
}
export let FontLoader: any;
