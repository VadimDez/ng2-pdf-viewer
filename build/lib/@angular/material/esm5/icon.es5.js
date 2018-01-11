/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Attribute, ChangeDetectionStrategy, Component, ElementRef, Inject, Injectable, Input, NgModule, Optional, SecurityContext, SkipSelf, ViewEncapsulation } from '@angular/core';
import { MatCommonModule, mixinColor } from '@angular/material/core';
import { __extends } from 'tslib';
import * as tslib_1 from 'tslib';
import { take } from 'rxjs/operators/take';
import { catchError } from 'rxjs/operators/catchError';
import { tap } from 'rxjs/operators/tap';
import { finalize } from 'rxjs/operators/finalize';
import { map } from 'rxjs/operators/map';
import { share } from 'rxjs/operators/share';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { DOCUMENT } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Returns an exception to be thrown in the case when attempting to
 * load an icon with a name that cannot be found.
 * \@docs-private
 * @param {?} iconName
 * @return {?}
 */
function getMatIconNameNotFoundError(iconName) {
    return Error("Unable to find icon with the name \"" + iconName + "\"");
}
/**
 * Returns an exception to be thrown when the consumer attempts to use
 * `<mat-icon>` without including \@angular/http.
 * \@docs-private
 * @return {?}
 */
function getMatIconNoHttpProviderError() {
    return Error('Could not find HttpClient provider for use with Angular Material icons. ' +
        'Please include the HttpClientModule from @angular/common/http in your ' +
        'app imports.');
}
/**
 * Returns an exception to be thrown when a URL couldn't be sanitized.
 * \@docs-private
 * @param {?} url URL that was attempted to be sanitized.
 * @return {?}
 */
function getMatIconFailedToSanitizeError(url) {
    return Error("The URL provided to MatIconRegistry was not trusted as a resource URL " +
        ("via Angular's DomSanitizer. Attempted URL was \"" + url + "\"."));
}
/**
 * Configuration for an icon, including the URL and possibly the cached SVG element.
 * \@docs-private
 */
var SvgIconConfig = /** @class */ (function () {
    function SvgIconConfig(url) {
        this.url = url;
        this.svgElement = null;
    }
    return SvgIconConfig;
}());
/**
 * Service to register and display icons used by the <mat-icon> component.
 * - Registers icon URLs by namespace and name.
 * - Registers icon set URLs by namespace.
 * - Registers aliases for CSS classes, for use with icon fonts.
 * - Loads icons from URLs and extracts individual icons from icon sets.
 */
var MatIconRegistry = /** @class */ (function () {
    function MatIconRegistry(_httpClient, _sanitizer, _document) {
        // TODO(crisbeto): make _document required next major release.
        this._httpClient = _httpClient;
        this._sanitizer = _sanitizer;
        this._document = _document;
        /**
         * URLs and cached SVG elements for individual icons. Keys are of the format "[namespace]:[icon]".
         */
        this._svgIconConfigs = new Map();
        /**
         * SvgIconConfig objects and cached SVG elements for icon sets, keyed by namespace.
         * Multiple icon sets can be registered under the same namespace.
         */
        this._iconSetConfigs = new Map();
        /**
         * Cache for icons loaded by direct URLs.
         */
        this._cachedIconsByUrl = new Map();
        /**
         * In-progress icon fetches. Used to coalesce multiple requests to the same URL.
         */
        this._inProgressUrlFetches = new Map();
        /**
         * Map from font identifiers to their CSS class names. Used for icon fonts.
         */
        this._fontCssClassesByAlias = new Map();
        /**
         * The CSS class to apply when an <mat-icon> component has no icon name, url, or font specified.
         * The default 'material-icons' value assumes that the material icon font has been loaded as
         * described at http://google.github.io/material-design-icons/#icon-font-for-the-web
         */
        this._defaultFontSetClass = 'material-icons';
    }
    /**
     * Registers an icon by URL in the default namespace.
     * @param iconName Name under which the icon should be registered.
     * @param url
     */
    /**
     * Registers an icon by URL in the default namespace.
     * @param {?} iconName Name under which the icon should be registered.
     * @param {?} url
     * @return {?}
     */
    MatIconRegistry.prototype.addSvgIcon = /**
     * Registers an icon by URL in the default namespace.
     * @param {?} iconName Name under which the icon should be registered.
     * @param {?} url
     * @return {?}
     */
    function (iconName, url) {
        return this.addSvgIconInNamespace('', iconName, url);
    };
    /**
     * Registers an icon by URL in the specified namespace.
     * @param namespace Namespace in which the icon should be registered.
     * @param iconName Name under which the icon should be registered.
     * @param url
     */
    /**
     * Registers an icon by URL in the specified namespace.
     * @param {?} namespace Namespace in which the icon should be registered.
     * @param {?} iconName Name under which the icon should be registered.
     * @param {?} url
     * @return {?}
     */
    MatIconRegistry.prototype.addSvgIconInNamespace = /**
     * Registers an icon by URL in the specified namespace.
     * @param {?} namespace Namespace in which the icon should be registered.
     * @param {?} iconName Name under which the icon should be registered.
     * @param {?} url
     * @return {?}
     */
    function (namespace, iconName, url) {
        var /** @type {?} */ key = iconKey(namespace, iconName);
        this._svgIconConfigs.set(key, new SvgIconConfig(url));
        return this;
    };
    /**
     * Registers an icon set by URL in the default namespace.
     * @param url
     */
    /**
     * Registers an icon set by URL in the default namespace.
     * @param {?} url
     * @return {?}
     */
    MatIconRegistry.prototype.addSvgIconSet = /**
     * Registers an icon set by URL in the default namespace.
     * @param {?} url
     * @return {?}
     */
    function (url) {
        return this.addSvgIconSetInNamespace('', url);
    };
    /**
     * Registers an icon set by URL in the specified namespace.
     * @param namespace Namespace in which to register the icon set.
     * @param url
     */
    /**
     * Registers an icon set by URL in the specified namespace.
     * @param {?} namespace Namespace in which to register the icon set.
     * @param {?} url
     * @return {?}
     */
    MatIconRegistry.prototype.addSvgIconSetInNamespace = /**
     * Registers an icon set by URL in the specified namespace.
     * @param {?} namespace Namespace in which to register the icon set.
     * @param {?} url
     * @return {?}
     */
    function (namespace, url) {
        var /** @type {?} */ config = new SvgIconConfig(url);
        var /** @type {?} */ configNamespace = this._iconSetConfigs.get(namespace);
        if (configNamespace) {
            configNamespace.push(config);
        }
        else {
            this._iconSetConfigs.set(namespace, [config]);
        }
        return this;
    };
    /**
     * Defines an alias for a CSS class name to be used for icon fonts. Creating an matIcon
     * component with the alias as the fontSet input will cause the class name to be applied
     * to the <mat-icon> element.
     *
     * @param alias Alias for the font.
     * @param className Class name override to be used instead of the alias.
     */
    /**
     * Defines an alias for a CSS class name to be used for icon fonts. Creating an matIcon
     * component with the alias as the fontSet input will cause the class name to be applied
     * to the <mat-icon> element.
     *
     * @param {?} alias Alias for the font.
     * @param {?=} className Class name override to be used instead of the alias.
     * @return {?}
     */
    MatIconRegistry.prototype.registerFontClassAlias = /**
     * Defines an alias for a CSS class name to be used for icon fonts. Creating an matIcon
     * component with the alias as the fontSet input will cause the class name to be applied
     * to the <mat-icon> element.
     *
     * @param {?} alias Alias for the font.
     * @param {?=} className Class name override to be used instead of the alias.
     * @return {?}
     */
    function (alias, className) {
        if (className === void 0) { className = alias; }
        this._fontCssClassesByAlias.set(alias, className);
        return this;
    };
    /**
     * Returns the CSS class name associated with the alias by a previous call to
     * registerFontClassAlias. If no CSS class has been associated, returns the alias unmodified.
     */
    /**
     * Returns the CSS class name associated with the alias by a previous call to
     * registerFontClassAlias. If no CSS class has been associated, returns the alias unmodified.
     * @param {?} alias
     * @return {?}
     */
    MatIconRegistry.prototype.classNameForFontAlias = /**
     * Returns the CSS class name associated with the alias by a previous call to
     * registerFontClassAlias. If no CSS class has been associated, returns the alias unmodified.
     * @param {?} alias
     * @return {?}
     */
    function (alias) {
        return this._fontCssClassesByAlias.get(alias) || alias;
    };
    /**
     * Sets the CSS class name to be used for icon fonts when an <mat-icon> component does not
     * have a fontSet input value, and is not loading an icon by name or URL.
     *
     * @param className
     */
    /**
     * Sets the CSS class name to be used for icon fonts when an <mat-icon> component does not
     * have a fontSet input value, and is not loading an icon by name or URL.
     *
     * @param {?} className
     * @return {?}
     */
    MatIconRegistry.prototype.setDefaultFontSetClass = /**
     * Sets the CSS class name to be used for icon fonts when an <mat-icon> component does not
     * have a fontSet input value, and is not loading an icon by name or URL.
     *
     * @param {?} className
     * @return {?}
     */
    function (className) {
        this._defaultFontSetClass = className;
        return this;
    };
    /**
     * Returns the CSS class name to be used for icon fonts when an <mat-icon> component does not
     * have a fontSet input value, and is not loading an icon by name or URL.
     */
    /**
     * Returns the CSS class name to be used for icon fonts when an <mat-icon> component does not
     * have a fontSet input value, and is not loading an icon by name or URL.
     * @return {?}
     */
    MatIconRegistry.prototype.getDefaultFontSetClass = /**
     * Returns the CSS class name to be used for icon fonts when an <mat-icon> component does not
     * have a fontSet input value, and is not loading an icon by name or URL.
     * @return {?}
     */
    function () {
        return this._defaultFontSetClass;
    };
    /**
     * Returns an Observable that produces the icon (as an `<svg>` DOM element) from the given URL.
     * The response from the URL may be cached so this will not always cause an HTTP request, but
     * the produced element will always be a new copy of the originally fetched icon. (That is,
     * it will not contain any modifications made to elements previously returned).
     *
     * @param safeUrl URL from which to fetch the SVG icon.
     */
    /**
     * Returns an Observable that produces the icon (as an `<svg>` DOM element) from the given URL.
     * The response from the URL may be cached so this will not always cause an HTTP request, but
     * the produced element will always be a new copy of the originally fetched icon. (That is,
     * it will not contain any modifications made to elements previously returned).
     *
     * @param {?} safeUrl URL from which to fetch the SVG icon.
     * @return {?}
     */
    MatIconRegistry.prototype.getSvgIconFromUrl = /**
     * Returns an Observable that produces the icon (as an `<svg>` DOM element) from the given URL.
     * The response from the URL may be cached so this will not always cause an HTTP request, but
     * the produced element will always be a new copy of the originally fetched icon. (That is,
     * it will not contain any modifications made to elements previously returned).
     *
     * @param {?} safeUrl URL from which to fetch the SVG icon.
     * @return {?}
     */
    function (safeUrl) {
        var _this = this;
        var /** @type {?} */ url = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL, safeUrl);
        if (!url) {
            throw getMatIconFailedToSanitizeError(safeUrl);
        }
        var /** @type {?} */ cachedIcon = this._cachedIconsByUrl.get(url);
        if (cachedIcon) {
            return of(cloneSvg(cachedIcon));
        }
        return this._loadSvgIconFromConfig(new SvgIconConfig(safeUrl)).pipe(tap(function (svg) { return _this._cachedIconsByUrl.set(/** @type {?} */ ((url)), svg); }), map(function (svg) { return cloneSvg(svg); }));
    };
    /**
     * Returns an Observable that produces the icon (as an `<svg>` DOM element) with the given name
     * and namespace. The icon must have been previously registered with addIcon or addIconSet;
     * if not, the Observable will throw an error.
     *
     * @param name Name of the icon to be retrieved.
     * @param namespace Namespace in which to look for the icon.
     */
    /**
     * Returns an Observable that produces the icon (as an `<svg>` DOM element) with the given name
     * and namespace. The icon must have been previously registered with addIcon or addIconSet;
     * if not, the Observable will throw an error.
     *
     * @param {?} name Name of the icon to be retrieved.
     * @param {?=} namespace Namespace in which to look for the icon.
     * @return {?}
     */
    MatIconRegistry.prototype.getNamedSvgIcon = /**
     * Returns an Observable that produces the icon (as an `<svg>` DOM element) with the given name
     * and namespace. The icon must have been previously registered with addIcon or addIconSet;
     * if not, the Observable will throw an error.
     *
     * @param {?} name Name of the icon to be retrieved.
     * @param {?=} namespace Namespace in which to look for the icon.
     * @return {?}
     */
    function (name, namespace) {
        if (namespace === void 0) { namespace = ''; }
        // Return (copy of) cached icon if possible.
        var /** @type {?} */ key = iconKey(namespace, name);
        var /** @type {?} */ config = this._svgIconConfigs.get(key);
        if (config) {
            return this._getSvgFromConfig(config);
        }
        // See if we have any icon sets registered for the namespace.
        var /** @type {?} */ iconSetConfigs = this._iconSetConfigs.get(namespace);
        if (iconSetConfigs) {
            return this._getSvgFromIconSetConfigs(name, iconSetConfigs);
        }
        return _throw(getMatIconNameNotFoundError(key));
    };
    /**
     * Returns the cached icon for a SvgIconConfig if available, or fetches it from its URL if not.
     * @param {?} config
     * @return {?}
     */
    MatIconRegistry.prototype._getSvgFromConfig = /**
     * Returns the cached icon for a SvgIconConfig if available, or fetches it from its URL if not.
     * @param {?} config
     * @return {?}
     */
    function (config) {
        if (config.svgElement) {
            // We already have the SVG element for this icon, return a copy.
            return of(cloneSvg(config.svgElement));
        }
        else {
            // Fetch the icon from the config's URL, cache it, and return a copy.
            return this._loadSvgIconFromConfig(config).pipe(tap(function (svg) { return config.svgElement = svg; }), map(function (svg) { return cloneSvg(svg); }));
        }
    };
    /**
     * Attempts to find an icon with the specified name in any of the SVG icon sets.
     * First searches the available cached icons for a nested element with a matching name, and
     * if found copies the element to a new <svg> element. If not found, fetches all icon sets
     * that have not been cached, and searches again after all fetches are completed.
     * The returned Observable produces the SVG element if possible, and throws
     * an error if no icon with the specified name can be found.
     * @param {?} name
     * @param {?} iconSetConfigs
     * @return {?}
     */
    MatIconRegistry.prototype._getSvgFromIconSetConfigs = /**
     * Attempts to find an icon with the specified name in any of the SVG icon sets.
     * First searches the available cached icons for a nested element with a matching name, and
     * if found copies the element to a new <svg> element. If not found, fetches all icon sets
     * that have not been cached, and searches again after all fetches are completed.
     * The returned Observable produces the SVG element if possible, and throws
     * an error if no icon with the specified name can be found.
     * @param {?} name
     * @param {?} iconSetConfigs
     * @return {?}
     */
    function (name, iconSetConfigs) {
        var _this = this;
        // For all the icon set SVG elements we've fetched, see if any contain an icon with the
        // requested name.
        var /** @type {?} */ namedIcon = this._extractIconWithNameFromAnySet(name, iconSetConfigs);
        if (namedIcon) {
            // We could cache namedIcon in _svgIconConfigs, but since we have to make a copy every
            // time anyway, there's probably not much advantage compared to just always extracting
            // it from the icon set.
            return of(namedIcon);
        }
        // Not found in any cached icon sets. If there are icon sets with URLs that we haven't
        // fetched, fetch them now and look for iconName in the results.
        var /** @type {?} */ iconSetFetchRequests = iconSetConfigs
            .filter(function (iconSetConfig) { return !iconSetConfig.svgElement; })
            .map(function (iconSetConfig) {
            return _this._loadSvgIconSetFromConfig(iconSetConfig).pipe(catchError(function (err) {
                var /** @type {?} */ url = _this._sanitizer.sanitize(SecurityContext.RESOURCE_URL, iconSetConfig.url);
                // Swallow errors fetching individual URLs so the combined Observable won't
                // necessarily fail.
                console.log("Loading icon set URL: " + url + " failed: " + err);
                return of(null);
            }), tap(function (svg) {
                // Cache the SVG element.
                if (svg) {
                    iconSetConfig.svgElement = svg;
                }
            }));
        });
        // Fetch all the icon set URLs. When the requests complete, every IconSet should have a
        // cached SVG element (unless the request failed), and we can check again for the icon.
        return forkJoin(iconSetFetchRequests).pipe(map(function () {
            var /** @type {?} */ foundIcon = _this._extractIconWithNameFromAnySet(name, iconSetConfigs);
            if (!foundIcon) {
                throw getMatIconNameNotFoundError(name);
            }
            return foundIcon;
        }));
    };
    /**
     * Searches the cached SVG elements for the given icon sets for a nested icon element whose "id"
     * tag matches the specified name. If found, copies the nested element to a new SVG element and
     * returns it. Returns null if no matching element is found.
     * @param {?} iconName
     * @param {?} iconSetConfigs
     * @return {?}
     */
    MatIconRegistry.prototype._extractIconWithNameFromAnySet = /**
     * Searches the cached SVG elements for the given icon sets for a nested icon element whose "id"
     * tag matches the specified name. If found, copies the nested element to a new SVG element and
     * returns it. Returns null if no matching element is found.
     * @param {?} iconName
     * @param {?} iconSetConfigs
     * @return {?}
     */
    function (iconName, iconSetConfigs) {
        // Iterate backwards, so icon sets added later have precedence.
        for (var /** @type {?} */ i = iconSetConfigs.length - 1; i >= 0; i--) {
            var /** @type {?} */ config = iconSetConfigs[i];
            if (config.svgElement) {
                var /** @type {?} */ foundIcon = this._extractSvgIconFromSet(config.svgElement, iconName);
                if (foundIcon) {
                    return foundIcon;
                }
            }
        }
        return null;
    };
    /**
     * Loads the content of the icon URL specified in the SvgIconConfig and creates an SVG element
     * from it.
     * @param {?} config
     * @return {?}
     */
    MatIconRegistry.prototype._loadSvgIconFromConfig = /**
     * Loads the content of the icon URL specified in the SvgIconConfig and creates an SVG element
     * from it.
     * @param {?} config
     * @return {?}
     */
    function (config) {
        var _this = this;
        return this._fetchUrl(config.url)
            .pipe(map(function (svgText) { return _this._createSvgElementForSingleIcon(svgText); }));
    };
    /**
     * Loads the content of the icon set URL specified in the SvgIconConfig and creates an SVG element
     * from it.
     * @param {?} config
     * @return {?}
     */
    MatIconRegistry.prototype._loadSvgIconSetFromConfig = /**
     * Loads the content of the icon set URL specified in the SvgIconConfig and creates an SVG element
     * from it.
     * @param {?} config
     * @return {?}
     */
    function (config) {
        var _this = this;
        // TODO: Document that icons should only be loaded from trusted sources.
        return this._fetchUrl(config.url).pipe(map(function (svgText) { return _this._svgElementFromString(svgText); }));
    };
    /**
     * Creates a DOM element from the given SVG string, and adds default attributes.
     * @param {?} responseText
     * @return {?}
     */
    MatIconRegistry.prototype._createSvgElementForSingleIcon = /**
     * Creates a DOM element from the given SVG string, and adds default attributes.
     * @param {?} responseText
     * @return {?}
     */
    function (responseText) {
        var /** @type {?} */ svg = this._svgElementFromString(responseText);
        this._setSvgAttributes(svg);
        return svg;
    };
    /**
     * Searches the cached element of the given SvgIconConfig for a nested icon element whose "id"
     * tag matches the specified name. If found, copies the nested element to a new SVG element and
     * returns it. Returns null if no matching element is found.
     * @param {?} iconSet
     * @param {?} iconName
     * @return {?}
     */
    MatIconRegistry.prototype._extractSvgIconFromSet = /**
     * Searches the cached element of the given SvgIconConfig for a nested icon element whose "id"
     * tag matches the specified name. If found, copies the nested element to a new SVG element and
     * returns it. Returns null if no matching element is found.
     * @param {?} iconSet
     * @param {?} iconName
     * @return {?}
     */
    function (iconSet, iconName) {
        var /** @type {?} */ iconSource = iconSet.querySelector('#' + iconName);
        if (!iconSource) {
            return null;
        }
        // Clone the element and remove the ID to prevent multiple elements from being added
        // to the page with the same ID.
        var /** @type {?} */ iconElement = /** @type {?} */ (iconSource.cloneNode(true));
        iconElement.id = '';
        // If the icon node is itself an <svg> node, clone and return it directly. If not, set it as
        // the content of a new <svg> node.
        if (iconElement.nodeName.toLowerCase() === 'svg') {
            return this._setSvgAttributes(/** @type {?} */ (iconElement));
        }
        // If the node is a <symbol>, it won't be rendered so we have to convert it into <svg>. Note
        // that the same could be achieved by referring to it via <use href="#id">, however the <use>
        // tag is problematic on Firefox, because it needs to include the current page path.
        if (iconElement.nodeName.toLowerCase() === 'symbol') {
            return this._setSvgAttributes(this._toSvgElement(iconElement));
        }
        // createElement('SVG') doesn't work as expected; the DOM ends up with
        // the correct nodes, but the SVG content doesn't render. Instead we
        // have to create an empty SVG node using innerHTML and append its content.
        // Elements created using DOMParser.parseFromString have the same problem.
        // http://stackoverflow.com/questions/23003278/svg-innerhtml-in-firefox-can-not-display
        var /** @type {?} */ svg = this._svgElementFromString('<svg></svg>');
        // Clone the node so we don't remove it from the parent icon set element.
        svg.appendChild(iconElement);
        return this._setSvgAttributes(svg);
    };
    /**
     * Creates a DOM element from the given SVG string.
     * @param {?} str
     * @return {?}
     */
    MatIconRegistry.prototype._svgElementFromString = /**
     * Creates a DOM element from the given SVG string.
     * @param {?} str
     * @return {?}
     */
    function (str) {
        if (this._document || typeof document !== 'undefined') {
            var /** @type {?} */ div = (this._document || document).createElement('DIV');
            div.innerHTML = str;
            var /** @type {?} */ svg = /** @type {?} */ (div.querySelector('svg'));
            if (!svg) {
                throw Error('<svg> tag not found');
            }
            return svg;
        }
        throw new Error('MatIconRegistry could not resolve document.');
    };
    /**
     * Converts an element into an SVG node by cloning all of its children.
     * @param {?} element
     * @return {?}
     */
    MatIconRegistry.prototype._toSvgElement = /**
     * Converts an element into an SVG node by cloning all of its children.
     * @param {?} element
     * @return {?}
     */
    function (element) {
        var /** @type {?} */ svg = this._svgElementFromString('<svg></svg>');
        for (var /** @type {?} */ i = 0; i < element.childNodes.length; i++) {
            // Note: 1 corresponds to `Node.ELEMENT_NODE` which we can't use in Universal.
            if (element.childNodes[i].nodeType === 1) {
                svg.appendChild(element.childNodes[i].cloneNode(true));
            }
        }
        return svg;
    };
    /**
     * Sets the default attributes for an SVG element to be used as an icon.
     * @param {?} svg
     * @return {?}
     */
    MatIconRegistry.prototype._setSvgAttributes = /**
     * Sets the default attributes for an SVG element to be used as an icon.
     * @param {?} svg
     * @return {?}
     */
    function (svg) {
        if (!svg.getAttribute('xmlns')) {
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        }
        svg.setAttribute('fit', '');
        svg.setAttribute('height', '100%');
        svg.setAttribute('width', '100%');
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svg.setAttribute('focusable', 'false'); // Disable IE11 default behavior to make SVGs focusable.
        return svg;
    };
    /**
     * Returns an Observable which produces the string contents of the given URL. Results may be
     * cached, so future calls with the same URL may not cause another HTTP request.
     * @param {?} safeUrl
     * @return {?}
     */
    MatIconRegistry.prototype._fetchUrl = /**
     * Returns an Observable which produces the string contents of the given URL. Results may be
     * cached, so future calls with the same URL may not cause another HTTP request.
     * @param {?} safeUrl
     * @return {?}
     */
    function (safeUrl) {
        var _this = this;
        if (!this._httpClient) {
            throw getMatIconNoHttpProviderError();
        }
        var /** @type {?} */ url = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL, safeUrl);
        if (!url) {
            throw getMatIconFailedToSanitizeError(safeUrl);
        }
        // Store in-progress fetches to avoid sending a duplicate request for a URL when there is
        // already a request in progress for that URL. It's necessary to call share() on the
        // Observable returned by http.get() so that multiple subscribers don't cause multiple XHRs.
        var /** @type {?} */ inProgressFetch = this._inProgressUrlFetches.get(url);
        if (inProgressFetch) {
            return inProgressFetch;
        }
        // TODO(jelbourn): for some reason, the `finally` operator "loses" the generic type on the
        // Observable. Figure out why and fix it.
        var /** @type {?} */ req = this._httpClient.get(url, { responseType: 'text' }).pipe(finalize(function () { return _this._inProgressUrlFetches.delete(url); }), share());
        this._inProgressUrlFetches.set(url, req);
        return req;
    };
    MatIconRegistry.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MatIconRegistry.ctorParameters = function () { return [
        { type: HttpClient, decorators: [{ type: Optional },] },
        { type: DomSanitizer, },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] },] },
    ]; };
    return MatIconRegistry;
}());
/**
 * \@docs-private
 * @param {?} parentRegistry
 * @param {?} httpClient
 * @param {?} sanitizer
 * @param {?=} document
 * @return {?}
 */
function ICON_REGISTRY_PROVIDER_FACTORY(parentRegistry, httpClient, sanitizer, document) {
    return parentRegistry || new MatIconRegistry(httpClient, sanitizer, document);
}
/**
 * \@docs-private
 */
var ICON_REGISTRY_PROVIDER = {
    // If there is already an MatIconRegistry available, use that. Otherwise, provide a new one.
    provide: MatIconRegistry,
    deps: [
        [new Optional(), new SkipSelf(), MatIconRegistry],
        [new Optional(), HttpClient],
        DomSanitizer,
        [new Optional(), /** @type {?} */ (DOCUMENT)]
    ],
    useFactory: ICON_REGISTRY_PROVIDER_FACTORY
};
/**
 * Clones an SVGElement while preserving type information.
 * @param {?} svg
 * @return {?}
 */
function cloneSvg(svg) {
    return /** @type {?} */ (svg.cloneNode(true));
}
/**
 * Returns the cache key to use for an icon namespace and name.
 * @param {?} namespace
 * @param {?} name
 * @return {?}
 */
function iconKey(namespace, name) {
    return namespace + ':' + name;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * \@docs-private
 */
var MatIconBase = /** @class */ (function () {
    function MatIconBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return MatIconBase;
}());
var _MatIconMixinBase = mixinColor(MatIconBase);
/**
 * Component to display an icon. It can be used in the following ways:
 *
 * - Specify the svgIcon input to load an SVG icon from a URL previously registered with the
 *   addSvgIcon, addSvgIconInNamespace, addSvgIconSet, or addSvgIconSetInNamespace methods of
 *   MatIconRegistry. If the svgIcon value contains a colon it is assumed to be in the format
 *   "[namespace]:[name]", if not the value will be the name of an icon in the default namespace.
 *   Examples:
 *     <mat-icon svgIcon="left-arrow"></mat-icon>
 *     <mat-icon svgIcon="animals:cat"></mat-icon>
 *
 * - Use a font ligature as an icon by putting the ligature text in the content of the <mat-icon>
 *   component. By default the Material icons font is used as described at
 *   http://google.github.io/material-design-icons/#icon-font-for-the-web. You can specify an
 *   alternate font by setting the fontSet input to either the CSS class to apply to use the
 *   desired font, or to an alias previously registered with MatIconRegistry.registerFontClassAlias.
 *   Examples:
 *     <mat-icon>home</mat-icon>
 *     <mat-icon fontSet="myfont">sun</mat-icon>
 *
 * - Specify a font glyph to be included via CSS rules by setting the fontSet input to specify the
 *   font, and the fontIcon input to specify the icon. Typically the fontIcon will specify a
 *   CSS class which causes the glyph to be displayed via a :before selector, as in
 *   https://fortawesome.github.io/Font-Awesome/examples/
 *   Example:
 *     <mat-icon fontSet="fa" fontIcon="alarm"></mat-icon>
 */
var MatIcon = /** @class */ (function (_super) {
    __extends(MatIcon, _super);
    function MatIcon(elementRef, _iconRegistry, ariaHidden) {
        var _this = _super.call(this, elementRef) || this;
        _this._iconRegistry = _iconRegistry;
        // If the user has not explicitly set aria-hidden, mark the icon as hidden, as this is
        // the right thing to do for the majority of icon use-cases.
        if (!ariaHidden) {
            elementRef.nativeElement.setAttribute('aria-hidden', 'true');
        }
        return _this;
    }
    Object.defineProperty(MatIcon.prototype, "fontSet", {
        get: /**
         * Font set that the icon is a part of.
         * @return {?}
         */
        function () { return this._fontSet; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._fontSet = this._cleanupFontValue(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatIcon.prototype, "fontIcon", {
        get: /**
         * Name of an icon within a font set.
         * @return {?}
         */
        function () { return this._fontIcon; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._fontIcon = this._cleanupFontValue(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Splits an svgIcon binding value into its icon set and icon name components.
     * Returns a 2-element array of [(icon set), (icon name)].
     * The separator for the two fields is ':'. If there is no separator, an empty
     * string is returned for the icon set and the entire value is returned for
     * the icon name. If the argument is falsy, returns an array of two empty strings.
     * Throws an error if the name contains two or more ':' separators.
     * Examples:
     *   'social:cake' -> ['social', 'cake']
     *   'penguin' -> ['', 'penguin']
     *   null -> ['', '']
     *   'a:b:c' -> (throws Error)
     * @param {?} iconName
     * @return {?}
     */
    MatIcon.prototype._splitIconName = /**
     * Splits an svgIcon binding value into its icon set and icon name components.
     * Returns a 2-element array of [(icon set), (icon name)].
     * The separator for the two fields is ':'. If there is no separator, an empty
     * string is returned for the icon set and the entire value is returned for
     * the icon name. If the argument is falsy, returns an array of two empty strings.
     * Throws an error if the name contains two or more ':' separators.
     * Examples:
     *   'social:cake' -> ['social', 'cake']
     *   'penguin' -> ['', 'penguin']
     *   null -> ['', '']
     *   'a:b:c' -> (throws Error)
     * @param {?} iconName
     * @return {?}
     */
    function (iconName) {
        if (!iconName) {
            return ['', ''];
        }
        var /** @type {?} */ parts = iconName.split(':');
        switch (parts.length) {
            case 1: return ['', parts[0]]; // Use default namespace.
            case 2: return /** @type {?} */ (parts);
            default: throw Error("Invalid icon name: \"" + iconName + "\"");
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    MatIcon.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        // Only update the inline SVG icon if the inputs changed, to avoid unnecessary DOM operations.
        if (changes["svgIcon"]) {
            if (this.svgIcon) {
                var _a = this._splitIconName(this.svgIcon), namespace = _a[0], iconName = _a[1];
                this._iconRegistry.getNamedSvgIcon(iconName, namespace).pipe(take(1)).subscribe(function (svg) { return _this._setSvgElement(svg); }, function (err) { return console.log("Error retrieving icon: " + err.message); });
            }
            else {
                this._clearSvgElement();
            }
        }
        if (this._usingFontIcon()) {
            this._updateFontIconClasses();
        }
    };
    /**
     * @return {?}
     */
    MatIcon.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // Update font classes because ngOnChanges won't be called if none of the inputs are present,
        // e.g. <mat-icon>arrow</mat-icon> In this case we need to add a CSS class for the default font.
        if (this._usingFontIcon()) {
            this._updateFontIconClasses();
        }
    };
    /**
     * @return {?}
     */
    MatIcon.prototype._usingFontIcon = /**
     * @return {?}
     */
    function () {
        return !this.svgIcon;
    };
    /**
     * @param {?} svg
     * @return {?}
     */
    MatIcon.prototype._setSvgElement = /**
     * @param {?} svg
     * @return {?}
     */
    function (svg) {
        this._clearSvgElement();
        this._elementRef.nativeElement.appendChild(svg);
    };
    /**
     * @return {?}
     */
    MatIcon.prototype._clearSvgElement = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ layoutElement = this._elementRef.nativeElement;
        var /** @type {?} */ childCount = layoutElement.childNodes.length;
        // Remove existing child nodes and add the new SVG element. Note that we can't
        // use innerHTML, because IE will throw if the element has a data binding.
        for (var /** @type {?} */ i = 0; i < childCount; i++) {
            layoutElement.removeChild(layoutElement.childNodes[i]);
        }
    };
    /**
     * @return {?}
     */
    MatIcon.prototype._updateFontIconClasses = /**
     * @return {?}
     */
    function () {
        if (!this._usingFontIcon()) {
            return;
        }
        var /** @type {?} */ elem = this._elementRef.nativeElement;
        var /** @type {?} */ fontSetClass = this.fontSet ?
            this._iconRegistry.classNameForFontAlias(this.fontSet) :
            this._iconRegistry.getDefaultFontSetClass();
        if (fontSetClass != this._previousFontSetClass) {
            if (this._previousFontSetClass) {
                elem.classList.remove(this._previousFontSetClass);
            }
            if (fontSetClass) {
                elem.classList.add(fontSetClass);
            }
            this._previousFontSetClass = fontSetClass;
        }
        if (this.fontIcon != this._previousFontIconClass) {
            if (this._previousFontIconClass) {
                elem.classList.remove(this._previousFontIconClass);
            }
            if (this.fontIcon) {
                elem.classList.add(this.fontIcon);
            }
            this._previousFontIconClass = this.fontIcon;
        }
    };
    /**
     * Cleans up a value to be used as a fontIcon or fontSet.
     * Since the value ends up being assigned as a CSS class, we
     * have to trim the value and omit space-separated values.
     * @param {?} value
     * @return {?}
     */
    MatIcon.prototype._cleanupFontValue = /**
     * Cleans up a value to be used as a fontIcon or fontSet.
     * Since the value ends up being assigned as a CSS class, we
     * have to trim the value and omit space-separated values.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return typeof value === 'string' ? value.trim().split(' ')[0] : value;
    };
    MatIcon.decorators = [
        { type: Component, args: [{template: '<ng-content></ng-content>',
                    selector: 'mat-icon',
                    exportAs: 'matIcon',
                    styles: [".mat-icon{background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px}"],
                    inputs: ['color'],
                    host: {
                        'role': 'img',
                        'class': 'mat-icon',
                    },
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatIcon.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: MatIconRegistry, },
        { type: undefined, decorators: [{ type: Attribute, args: ['aria-hidden',] },] },
    ]; };
    MatIcon.propDecorators = {
        "svgIcon": [{ type: Input },],
        "fontSet": [{ type: Input },],
        "fontIcon": [{ type: Input },],
    };
    return MatIcon;
}(_MatIconMixinBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var MatIconModule = /** @class */ (function () {
    function MatIconModule() {
    }
    MatIconModule.decorators = [
        { type: NgModule, args: [{
                    imports: [MatCommonModule],
                    exports: [MatIcon, MatCommonModule],
                    declarations: [MatIcon],
                    providers: [ICON_REGISTRY_PROVIDER],
                },] },
    ];
    /** @nocollapse */
    MatIconModule.ctorParameters = function () { return []; };
    return MatIconModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { MatIconModule, MatIconBase, _MatIconMixinBase, MatIcon, getMatIconNameNotFoundError, getMatIconNoHttpProviderError, getMatIconFailedToSanitizeError, MatIconRegistry, ICON_REGISTRY_PROVIDER_FACTORY, ICON_REGISTRY_PROVIDER };
//# sourceMappingURL=icon.es5.js.map
