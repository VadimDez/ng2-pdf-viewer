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
exports.AnnotationLayer = void 0;

var _util = require("../shared/util.js");

var _display_utils = require("./display_utils.js");

var _annotation_storage = require("./annotation_storage.js");

var _scripting_utils = require("../shared/scripting_utils.js");

var _xfa_layer = require("./xfa_layer.js");

const DEFAULT_TAB_INDEX = 1000;
const GetElementsByNameSet = new WeakSet();

function getRectDims(rect) {
  return {
    width: rect[2] - rect[0],
    height: rect[3] - rect[1]
  };
}

class AnnotationElementFactory {
  static create(parameters) {
    const subtype = parameters.data.annotationType;

    switch (subtype) {
      case _util.AnnotationType.LINK:
        return new LinkAnnotationElement(parameters);

      case _util.AnnotationType.TEXT:
        return new TextAnnotationElement(parameters);

      case _util.AnnotationType.WIDGET:
        const fieldType = parameters.data.fieldType;

        switch (fieldType) {
          case "Tx":
            return new TextWidgetAnnotationElement(parameters);

          case "Btn":
            if (parameters.data.radioButton) {
              return new RadioButtonWidgetAnnotationElement(parameters);
            } else if (parameters.data.checkBox) {
              return new CheckboxWidgetAnnotationElement(parameters);
            }

            return new PushButtonWidgetAnnotationElement(parameters);

          case "Ch":
            return new ChoiceWidgetAnnotationElement(parameters);
        }

        return new WidgetAnnotationElement(parameters);

      case _util.AnnotationType.POPUP:
        return new PopupAnnotationElement(parameters);

      case _util.AnnotationType.FREETEXT:
        return new FreeTextAnnotationElement(parameters);

      case _util.AnnotationType.LINE:
        return new LineAnnotationElement(parameters);

      case _util.AnnotationType.SQUARE:
        return new SquareAnnotationElement(parameters);

      case _util.AnnotationType.CIRCLE:
        return new CircleAnnotationElement(parameters);

      case _util.AnnotationType.POLYLINE:
        return new PolylineAnnotationElement(parameters);

      case _util.AnnotationType.CARET:
        return new CaretAnnotationElement(parameters);

      case _util.AnnotationType.INK:
        return new InkAnnotationElement(parameters);

      case _util.AnnotationType.POLYGON:
        return new PolygonAnnotationElement(parameters);

      case _util.AnnotationType.HIGHLIGHT:
        return new HighlightAnnotationElement(parameters);

      case _util.AnnotationType.UNDERLINE:
        return new UnderlineAnnotationElement(parameters);

      case _util.AnnotationType.SQUIGGLY:
        return new SquigglyAnnotationElement(parameters);

      case _util.AnnotationType.STRIKEOUT:
        return new StrikeOutAnnotationElement(parameters);

      case _util.AnnotationType.STAMP:
        return new StampAnnotationElement(parameters);

      case _util.AnnotationType.FILEATTACHMENT:
        return new FileAttachmentAnnotationElement(parameters);

      default:
        return new AnnotationElement(parameters);
    }
  }

}

class AnnotationElement {
  constructor(parameters, {
    isRenderable = false,
    ignoreBorder = false,
    createQuadrilaterals = false
  } = {}) {
    this.isRenderable = isRenderable;
    this.data = parameters.data;
    this.layer = parameters.layer;
    this.page = parameters.page;
    this.viewport = parameters.viewport;
    this.linkService = parameters.linkService;
    this.downloadManager = parameters.downloadManager;
    this.imageResourcesPath = parameters.imageResourcesPath;
    this.renderForms = parameters.renderForms;
    this.svgFactory = parameters.svgFactory;
    this.annotationStorage = parameters.annotationStorage;
    this.enableScripting = parameters.enableScripting;
    this.hasJSActions = parameters.hasJSActions;
    this._fieldObjects = parameters.fieldObjects;
    this._mouseState = parameters.mouseState;

    if (isRenderable) {
      this.container = this._createContainer(ignoreBorder);
    }

    if (createQuadrilaterals) {
      this.quadrilaterals = this._createQuadrilaterals(ignoreBorder);
    }
  }

  _createContainer(ignoreBorder = false) {
    const data = this.data,
          page = this.page,
          viewport = this.viewport;
    const container = document.createElement("section");
    let {
      width,
      height
    } = getRectDims(data.rect);
    container.setAttribute("data-annotation-id", data.id);

    const rect = _util.Util.normalizeRect([data.rect[0], page.view[3] - data.rect[1] + page.view[1], data.rect[2], page.view[3] - data.rect[3] + page.view[1]]);

    if (data.hasOwnCanvas) {
      const transform = viewport.transform.slice();

      const [scaleX, scaleY] = _util.Util.singularValueDecompose2dScale(transform);

      width = Math.ceil(width * scaleX);
      height = Math.ceil(height * scaleY);
      rect[0] *= scaleX;
      rect[1] *= scaleY;

      for (let i = 0; i < 4; i++) {
        transform[i] = Math.sign(transform[i]);
      }

      container.style.transform = `matrix(${transform.join(",")})`;
    } else {
      container.style.transform = `matrix(${viewport.transform.join(",")})`;
    }

    container.style.transformOrigin = `${-rect[0]}px ${-rect[1]}px`;

    if (!ignoreBorder && data.borderStyle.width > 0) {
      container.style.borderWidth = `${data.borderStyle.width}px`;

      if (data.borderStyle.style !== _util.AnnotationBorderStyleType.UNDERLINE) {
        width -= 2 * data.borderStyle.width;
        height -= 2 * data.borderStyle.width;
      }

      const horizontalRadius = data.borderStyle.horizontalCornerRadius;
      const verticalRadius = data.borderStyle.verticalCornerRadius;

      if (horizontalRadius > 0 || verticalRadius > 0) {
        const radius = `${horizontalRadius}px / ${verticalRadius}px`;
        container.style.borderRadius = radius;
      }

      switch (data.borderStyle.style) {
        case _util.AnnotationBorderStyleType.SOLID:
          container.style.borderStyle = "solid";
          break;

        case _util.AnnotationBorderStyleType.DASHED:
          container.style.borderStyle = "dashed";
          break;

        case _util.AnnotationBorderStyleType.BEVELED:
          (0, _util.warn)("Unimplemented border style: beveled");
          break;

        case _util.AnnotationBorderStyleType.INSET:
          (0, _util.warn)("Unimplemented border style: inset");
          break;

        case _util.AnnotationBorderStyleType.UNDERLINE:
          container.style.borderBottomStyle = "solid";
          break;

        default:
          break;
      }

      const borderColor = data.borderColor || data.color || null;

      if (borderColor) {
        container.style.borderColor = _util.Util.makeHexColor(data.color[0] | 0, data.color[1] | 0, data.color[2] | 0);
      } else {
        container.style.borderWidth = 0;
      }
    }

    container.style.left = `${rect[0]}px`;
    container.style.top = `${rect[1]}px`;

    if (data.hasOwnCanvas) {
      container.style.width = container.style.height = "auto";
    } else {
      container.style.width = `${width}px`;
      container.style.height = `${height}px`;
    }

    return container;
  }

  get _commonActions() {
    const setColor = (jsName, styleName, event) => {
      const color = event.detail[jsName];
      event.target.style[styleName] = _scripting_utils.ColorConverters[`${color[0]}_HTML`](color.slice(1));
    };

    return (0, _util.shadow)(this, "_commonActions", {
      display: event => {
        const hidden = event.detail.display % 2 === 1;
        event.target.style.visibility = hidden ? "hidden" : "visible";
        this.annotationStorage.setValue(this.data.id, {
          hidden,
          print: event.detail.display === 0 || event.detail.display === 3
        });
      },
      print: event => {
        this.annotationStorage.setValue(this.data.id, {
          print: event.detail.print
        });
      },
      hidden: event => {
        event.target.style.visibility = event.detail.hidden ? "hidden" : "visible";
        this.annotationStorage.setValue(this.data.id, {
          hidden: event.detail.hidden
        });
      },
      focus: event => {
        setTimeout(() => event.target.focus({
          preventScroll: false
        }), 0);
      },
      userName: event => {
        event.target.title = event.detail.userName;
      },
      readonly: event => {
        if (event.detail.readonly) {
          event.target.setAttribute("readonly", "");
        } else {
          event.target.removeAttribute("readonly");
        }
      },
      required: event => {
        if (event.detail.required) {
          event.target.setAttribute("required", "");
        } else {
          event.target.removeAttribute("required");
        }
      },
      bgColor: event => {
        setColor("bgColor", "backgroundColor", event);
      },
      fillColor: event => {
        setColor("fillColor", "backgroundColor", event);
      },
      fgColor: event => {
        setColor("fgColor", "color", event);
      },
      textColor: event => {
        setColor("textColor", "color", event);
      },
      borderColor: event => {
        setColor("borderColor", "borderColor", event);
      },
      strokeColor: event => {
        setColor("strokeColor", "borderColor", event);
      }
    });
  }

  _dispatchEventFromSandbox(actions, jsEvent) {
    const commonActions = this._commonActions;

    for (const name of Object.keys(jsEvent.detail)) {
      const action = actions[name] || commonActions[name];

      if (action) {
        action(jsEvent);
      }
    }
  }

  _setDefaultPropertiesFromJS(element) {
    if (!this.enableScripting) {
      return;
    }

    const storedData = this.annotationStorage.getRawValue(this.data.id);

    if (!storedData) {
      return;
    }

    const commonActions = this._commonActions;

    for (const [actionName, detail] of Object.entries(storedData)) {
      const action = commonActions[actionName];

      if (action) {
        action({
          detail,
          target: element
        });
        delete storedData[actionName];
      }
    }
  }

  _createQuadrilaterals(ignoreBorder = false) {
    if (!this.data.quadPoints) {
      return null;
    }

    const quadrilaterals = [];
    const savedRect = this.data.rect;

    for (const quadPoint of this.data.quadPoints) {
      this.data.rect = [quadPoint[2].x, quadPoint[2].y, quadPoint[1].x, quadPoint[1].y];
      quadrilaterals.push(this._createContainer(ignoreBorder));
    }

    this.data.rect = savedRect;
    return quadrilaterals;
  }

  _createPopup(trigger, data) {
    let container = this.container;

    if (this.quadrilaterals) {
      trigger = trigger || this.quadrilaterals;
      container = this.quadrilaterals[0];
    }

    if (!trigger) {
      trigger = document.createElement("div");
      trigger.style.height = container.style.height;
      trigger.style.width = container.style.width;
      container.appendChild(trigger);
    }

    const popupElement = new PopupElement({
      container,
      trigger,
      color: data.color,
      titleObj: data.titleObj,
      modificationDate: data.modificationDate,
      contentsObj: data.contentsObj,
      richText: data.richText,
      hideWrapper: true
    });
    const popup = popupElement.render();
    popup.style.left = container.style.width;
    container.appendChild(popup);
  }

  _renderQuadrilaterals(className) {
    for (const quadrilateral of this.quadrilaterals) {
      quadrilateral.className = className;
    }

    return this.quadrilaterals;
  }

  render() {
    (0, _util.unreachable)("Abstract method `AnnotationElement.render` called");
  }

  _getElementsByName(name, skipId = null) {
    const fields = [];

    if (this._fieldObjects) {
      const fieldObj = this._fieldObjects[name];

      if (fieldObj) {
        for (const {
          page,
          id,
          exportValues
        } of fieldObj) {
          if (page === -1) {
            continue;
          }

          if (id === skipId) {
            continue;
          }

          const exportValue = typeof exportValues === "string" ? exportValues : null;
          const domElement = document.getElementById(id);

          if (domElement && !GetElementsByNameSet.has(domElement)) {
            (0, _util.warn)(`_getElementsByName - element not allowed: ${id}`);
            continue;
          }

          fields.push({
            id,
            exportValue,
            domElement
          });
        }
      }

      return fields;
    }

    for (const domElement of document.getElementsByName(name)) {
      const {
        id,
        exportValue
      } = domElement;

      if (id === skipId) {
        continue;
      }

      if (!GetElementsByNameSet.has(domElement)) {
        continue;
      }

      fields.push({
        id,
        exportValue,
        domElement
      });
    }

    return fields;
  }

  static get platform() {
    const platform = typeof navigator !== "undefined" ? navigator.platform : "";
    return (0, _util.shadow)(this, "platform", {
      isWin: platform.includes("Win"),
      isMac: platform.includes("Mac")
    });
  }

}

class LinkAnnotationElement extends AnnotationElement {
  constructor(parameters, options = null) {
    const isRenderable = !!(parameters.data.url || parameters.data.dest || parameters.data.action || parameters.data.isTooltipOnly || parameters.data.resetForm || parameters.data.actions && (parameters.data.actions.Action || parameters.data.actions["Mouse Up"] || parameters.data.actions["Mouse Down"]));
    super(parameters, {
      isRenderable,
      ignoreBorder: !!options?.ignoreBorder,
      createQuadrilaterals: true
    });
  }

  render() {
    const {
      data,
      linkService
    } = this;
    const link = document.createElement("a");

    if (data.url) {
      linkService.addLinkAttributes(link, data.url, data.newWindow);
    } else if (data.action) {
      this._bindNamedAction(link, data.action);
    } else if (data.dest) {
      this._bindLink(link, data.dest);
    } else {
      let hasClickAction = false;

      if (data.actions && (data.actions.Action || data.actions["Mouse Up"] || data.actions["Mouse Down"]) && this.enableScripting && this.hasJSActions) {
        hasClickAction = true;

        this._bindJSAction(link, data);
      }

      if (data.resetForm) {
        this._bindResetFormAction(link, data.resetForm);
      } else if (!hasClickAction) {
        this._bindLink(link, "");
      }
    }

    if (this.quadrilaterals) {
      return this._renderQuadrilaterals("linkAnnotation").map((quadrilateral, index) => {
        const linkElement = index === 0 ? link : link.cloneNode();
        quadrilateral.appendChild(linkElement);
        return quadrilateral;
      });
    }

    this.container.className = "linkAnnotation";
    this.container.appendChild(link);
    return this.container;
  }

  _bindLink(link, destination) {
    link.href = this.linkService.getDestinationHash(destination);

    link.onclick = () => {
      if (destination) {
        this.linkService.goToDestination(destination);
      }

      return false;
    };

    if (destination || destination === "") {
      link.className = "internalLink";
    }
  }

  _bindNamedAction(link, action) {
    link.href = this.linkService.getAnchorUrl("");

    link.onclick = () => {
      this.linkService.executeNamedAction(action);
      return false;
    };

    link.className = "internalLink";
  }

  _bindJSAction(link, data) {
    link.href = this.linkService.getAnchorUrl("");
    const map = new Map([["Action", "onclick"], ["Mouse Up", "onmouseup"], ["Mouse Down", "onmousedown"]]);

    for (const name of Object.keys(data.actions)) {
      const jsName = map.get(name);

      if (!jsName) {
        continue;
      }

      link[jsName] = () => {
        this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
          source: this,
          detail: {
            id: data.id,
            name
          }
        });
        return false;
      };
    }

    if (!link.onclick) {
      link.onclick = () => false;
    }

    link.className = "internalLink";
  }

  _bindResetFormAction(link, resetForm) {
    const otherClickAction = link.onclick;

    if (!otherClickAction) {
      link.href = this.linkService.getAnchorUrl("");
    }

    link.className = "internalLink";

    if (!this._fieldObjects) {
      (0, _util.warn)(`_bindResetFormAction - "resetForm" action not supported, ` + "ensure that the `fieldObjects` parameter is provided.");

      if (!otherClickAction) {
        link.onclick = () => false;
      }

      return;
    }

    link.onclick = () => {
      if (otherClickAction) {
        otherClickAction();
      }

      const {
        fields: resetFormFields,
        refs: resetFormRefs,
        include
      } = resetForm;
      const allFields = [];

      if (resetFormFields.length !== 0 || resetFormRefs.length !== 0) {
        const fieldIds = new Set(resetFormRefs);

        for (const fieldName of resetFormFields) {
          const fields = this._fieldObjects[fieldName] || [];

          for (const {
            id
          } of fields) {
            fieldIds.add(id);
          }
        }

        for (const fields of Object.values(this._fieldObjects)) {
          for (const field of fields) {
            if (fieldIds.has(field.id) === include) {
              allFields.push(field);
            }
          }
        }
      } else {
        for (const fields of Object.values(this._fieldObjects)) {
          allFields.push(...fields);
        }
      }

      const storage = this.annotationStorage;
      const allIds = [];

      for (const field of allFields) {
        const {
          id
        } = field;
        allIds.push(id);

        switch (field.type) {
          case "text":
            {
              const value = field.defaultValue || "";
              storage.setValue(id, {
                value
              });
              break;
            }

          case "checkbox":
          case "radiobutton":
            {
              const value = field.defaultValue === field.exportValues;
              storage.setValue(id, {
                value
              });
              break;
            }

          case "combobox":
          case "listbox":
            {
              const value = field.defaultValue || "";
              storage.setValue(id, {
                value
              });
              break;
            }

          default:
            continue;
        }

        const domElement = document.getElementById(id);

        if (!domElement || !GetElementsByNameSet.has(domElement)) {
          continue;
        }

        domElement.dispatchEvent(new Event("resetform"));
      }

      if (this.enableScripting) {
        this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
          source: this,
          detail: {
            id: "app",
            ids: allIds,
            name: "ResetForm"
          }
        });
      }

      return false;
    };
  }

}

class TextAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.titleObj?.str || parameters.data.contentsObj?.str || parameters.data.richText?.str);
    super(parameters, {
      isRenderable
    });
  }

  render() {
    this.container.className = "textAnnotation";
    const image = document.createElement("img");
    image.style.height = this.container.style.height;
    image.style.width = this.container.style.width;
    image.src = this.imageResourcesPath + "annotation-" + this.data.name.toLowerCase() + ".svg";
    image.alt = "[{{type}} Annotation]";
    image.dataset.l10nId = "text_annotation_type";
    image.dataset.l10nArgs = JSON.stringify({
      type: this.data.name
    });

    if (!this.data.hasPopup) {
      this._createPopup(image, this.data);
    }

    this.container.appendChild(image);
    return this.container;
  }

}

class WidgetAnnotationElement extends AnnotationElement {
  render() {
    if (this.data.alternativeText) {
      this.container.title = this.data.alternativeText;
    }

    return this.container;
  }

  _getKeyModifier(event) {
    const {
      isWin,
      isMac
    } = AnnotationElement.platform;
    return isWin && event.ctrlKey || isMac && event.metaKey;
  }

  _setEventListener(element, baseName, eventName, valueGetter) {
    if (baseName.includes("mouse")) {
      element.addEventListener(baseName, event => {
        this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
          source: this,
          detail: {
            id: this.data.id,
            name: eventName,
            value: valueGetter(event),
            shift: event.shiftKey,
            modifier: this._getKeyModifier(event)
          }
        });
      });
    } else {
      element.addEventListener(baseName, event => {
        this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
          source: this,
          detail: {
            id: this.data.id,
            name: eventName,
            value: valueGetter(event)
          }
        });
      });
    }
  }

  _setEventListeners(element, names, getter) {
    for (const [baseName, eventName] of names) {
      if (eventName === "Action" || this.data.actions?.[eventName]) {
        this._setEventListener(element, baseName, eventName, getter);
      }
    }
  }

  _setBackgroundColor(element) {
    const color = this.data.backgroundColor || null;
    element.style.backgroundColor = color === null ? "transparent" : _util.Util.makeHexColor(color[0], color[1], color[2]);
  }

}

class TextWidgetAnnotationElement extends WidgetAnnotationElement {
  constructor(parameters) {
    const isRenderable = parameters.renderForms || !parameters.data.hasAppearance && !!parameters.data.fieldValue;
    super(parameters, {
      isRenderable
    });
  }

  setPropertyOnSiblings(base, key, value, keyInStorage) {
    const storage = this.annotationStorage;

    for (const element of this._getElementsByName(base.name, base.id)) {
      if (element.domElement) {
        element.domElement[key] = value;
      }

      storage.setValue(element.id, {
        [keyInStorage]: value
      });
    }
  }

  render() {
    const storage = this.annotationStorage;
    const id = this.data.id;
    this.container.className = "textWidgetAnnotation";
    let element = null;

    if (this.renderForms) {
      const storedData = storage.getValue(id, {
        value: this.data.fieldValue
      });
      const textContent = storedData.formattedValue || storedData.value || "";
      const elementData = {
        userValue: null,
        formattedValue: null,
        valueOnFocus: ""
      };

      if (this.data.multiLine) {
        element = document.createElement("textarea");
        element.textContent = textContent;
      } else {
        element = document.createElement("input");
        element.type = "text";
        element.setAttribute("value", textContent);
      }

      GetElementsByNameSet.add(element);
      element.disabled = this.data.readOnly;
      element.name = this.data.fieldName;
      element.tabIndex = DEFAULT_TAB_INDEX;
      elementData.userValue = textContent;
      element.setAttribute("id", id);
      element.addEventListener("input", event => {
        storage.setValue(id, {
          value: event.target.value
        });
        this.setPropertyOnSiblings(element, "value", event.target.value, "value");
      });
      element.addEventListener("resetform", event => {
        const defaultValue = this.data.defaultFieldValue ?? "";
        element.value = elementData.userValue = defaultValue;
        elementData.formattedValue = null;
      });

      let blurListener = event => {
        const {
          formattedValue
        } = elementData;

        if (formattedValue !== null && formattedValue !== undefined) {
          event.target.value = formattedValue;
        }

        event.target.scrollLeft = 0;
      };

      if (this.enableScripting && this.hasJSActions) {
        element.addEventListener("focus", event => {
          if (elementData.userValue) {
            event.target.value = elementData.userValue;
          }

          elementData.valueOnFocus = event.target.value;
        });
        element.addEventListener("updatefromsandbox", jsEvent => {
          const actions = {
            value(event) {
              elementData.userValue = event.detail.value ?? "";
              storage.setValue(id, {
                value: elementData.userValue.toString()
              });
              event.target.value = elementData.userValue;
            },

            formattedValue(event) {
              const {
                formattedValue
              } = event.detail;
              elementData.formattedValue = formattedValue;

              if (formattedValue !== null && formattedValue !== undefined && event.target !== document.activeElement) {
                event.target.value = formattedValue;
              }

              storage.setValue(id, {
                formattedValue
              });
            },

            selRange(event) {
              event.target.setSelectionRange(...event.detail.selRange);
            }

          };

          this._dispatchEventFromSandbox(actions, jsEvent);
        });
        element.addEventListener("keydown", event => {
          let commitKey = -1;

          if (event.key === "Escape") {
            commitKey = 0;
          } else if (event.key === "Enter") {
            commitKey = 2;
          } else if (event.key === "Tab") {
            commitKey = 3;
          }

          if (commitKey === -1) {
            return;
          }

          const {
            value
          } = event.target;

          if (elementData.valueOnFocus === value) {
            return;
          }

          elementData.userValue = value;
          this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
            source: this,
            detail: {
              id,
              name: "Keystroke",
              value,
              willCommit: true,
              commitKey,
              selStart: event.target.selectionStart,
              selEnd: event.target.selectionEnd
            }
          });
        });
        const _blurListener = blurListener;
        blurListener = null;
        element.addEventListener("blur", event => {
          const {
            value
          } = event.target;
          elementData.userValue = value;

          if (this._mouseState.isDown && elementData.valueOnFocus !== value) {
            this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
              source: this,
              detail: {
                id,
                name: "Keystroke",
                value,
                willCommit: true,
                commitKey: 1,
                selStart: event.target.selectionStart,
                selEnd: event.target.selectionEnd
              }
            });
          }

          _blurListener(event);
        });

        if (this.data.actions?.Keystroke) {
          element.addEventListener("beforeinput", event => {
            const {
              data,
              target
            } = event;
            const {
              value,
              selectionStart,
              selectionEnd
            } = target;
            let selStart = selectionStart,
                selEnd = selectionEnd;

            switch (event.inputType) {
              case "deleteWordBackward":
                {
                  const match = value.substring(0, selectionStart).match(/\w*[^\w]*$/);

                  if (match) {
                    selStart -= match[0].length;
                  }

                  break;
                }

              case "deleteWordForward":
                {
                  const match = value.substring(selectionStart).match(/^[^\w]*\w*/);

                  if (match) {
                    selEnd += match[0].length;
                  }

                  break;
                }

              case "deleteContentBackward":
                if (selectionStart === selectionEnd) {
                  selStart -= 1;
                }

                break;

              case "deleteContentForward":
                if (selectionStart === selectionEnd) {
                  selEnd += 1;
                }

                break;
            }

            event.preventDefault();
            this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
              source: this,
              detail: {
                id,
                name: "Keystroke",
                value,
                change: data || "",
                willCommit: false,
                selStart,
                selEnd
              }
            });
          });
        }

        this._setEventListeners(element, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], event => event.target.value);
      }

      if (blurListener) {
        element.addEventListener("blur", blurListener);
      }

      if (this.data.maxLen !== null) {
        element.maxLength = this.data.maxLen;
      }

      if (this.data.comb) {
        const fieldWidth = this.data.rect[2] - this.data.rect[0];
        const combWidth = fieldWidth / this.data.maxLen;
        element.classList.add("comb");
        element.style.letterSpacing = `calc(${combWidth}px - 1ch)`;
      }
    } else {
      element = document.createElement("div");
      element.textContent = this.data.fieldValue;
      element.style.verticalAlign = "middle";
      element.style.display = "table-cell";
    }

    this._setTextStyle(element);

    this._setBackgroundColor(element);

    this._setDefaultPropertiesFromJS(element);

    this.container.appendChild(element);
    return this.container;
  }

  _setTextStyle(element) {
    const TEXT_ALIGNMENT = ["left", "center", "right"];
    const {
      fontSize,
      fontColor
    } = this.data.defaultAppearanceData;
    const style = element.style;

    if (fontSize) {
      style.fontSize = `${fontSize}px`;
    }

    style.color = _util.Util.makeHexColor(fontColor[0], fontColor[1], fontColor[2]);

    if (this.data.textAlignment !== null) {
      style.textAlign = TEXT_ALIGNMENT[this.data.textAlignment];
    }
  }

}

class CheckboxWidgetAnnotationElement extends WidgetAnnotationElement {
  constructor(parameters) {
    super(parameters, {
      isRenderable: parameters.renderForms
    });
  }

  render() {
    const storage = this.annotationStorage;
    const data = this.data;
    const id = data.id;
    let value = storage.getValue(id, {
      value: data.exportValue === data.fieldValue
    }).value;

    if (typeof value === "string") {
      value = value !== "Off";
      storage.setValue(id, {
        value
      });
    }

    this.container.className = "buttonWidgetAnnotation checkBox";
    const element = document.createElement("input");
    GetElementsByNameSet.add(element);
    element.disabled = data.readOnly;
    element.type = "checkbox";
    element.name = data.fieldName;

    if (value) {
      element.setAttribute("checked", true);
    }

    element.setAttribute("id", id);
    element.setAttribute("exportValue", data.exportValue);
    element.tabIndex = DEFAULT_TAB_INDEX;
    element.addEventListener("change", event => {
      const {
        name,
        checked
      } = event.target;

      for (const checkbox of this._getElementsByName(name, id)) {
        const curChecked = checked && checkbox.exportValue === data.exportValue;

        if (checkbox.domElement) {
          checkbox.domElement.checked = curChecked;
        }

        storage.setValue(checkbox.id, {
          value: curChecked
        });
      }

      storage.setValue(id, {
        value: checked
      });
    });
    element.addEventListener("resetform", event => {
      const defaultValue = data.defaultFieldValue || "Off";
      event.target.checked = defaultValue === data.exportValue;
    });

    if (this.enableScripting && this.hasJSActions) {
      element.addEventListener("updatefromsandbox", jsEvent => {
        const actions = {
          value(event) {
            event.target.checked = event.detail.value !== "Off";
            storage.setValue(id, {
              value: event.target.checked
            });
          }

        };

        this._dispatchEventFromSandbox(actions, jsEvent);
      });

      this._setEventListeners(element, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], event => event.target.checked);
    }

    this._setBackgroundColor(element);

    this._setDefaultPropertiesFromJS(element);

    this.container.appendChild(element);
    return this.container;
  }

}

class RadioButtonWidgetAnnotationElement extends WidgetAnnotationElement {
  constructor(parameters) {
    super(parameters, {
      isRenderable: parameters.renderForms
    });
  }

  render() {
    this.container.className = "buttonWidgetAnnotation radioButton";
    const storage = this.annotationStorage;
    const data = this.data;
    const id = data.id;
    let value = storage.getValue(id, {
      value: data.fieldValue === data.buttonValue
    }).value;

    if (typeof value === "string") {
      value = value !== data.buttonValue;
      storage.setValue(id, {
        value
      });
    }

    const element = document.createElement("input");
    GetElementsByNameSet.add(element);
    element.disabled = data.readOnly;
    element.type = "radio";
    element.name = data.fieldName;

    if (value) {
      element.setAttribute("checked", true);
    }

    element.setAttribute("id", id);
    element.tabIndex = DEFAULT_TAB_INDEX;
    element.addEventListener("change", event => {
      const {
        name,
        checked
      } = event.target;

      for (const radio of this._getElementsByName(name, id)) {
        storage.setValue(radio.id, {
          value: false
        });
      }

      storage.setValue(id, {
        value: checked
      });
    });
    element.addEventListener("resetform", event => {
      const defaultValue = data.defaultFieldValue;
      event.target.checked = defaultValue !== null && defaultValue !== undefined && defaultValue === data.buttonValue;
    });

    if (this.enableScripting && this.hasJSActions) {
      const pdfButtonValue = data.buttonValue;
      element.addEventListener("updatefromsandbox", jsEvent => {
        const actions = {
          value: event => {
            const checked = pdfButtonValue === event.detail.value;

            for (const radio of this._getElementsByName(event.target.name)) {
              const curChecked = checked && radio.id === id;

              if (radio.domElement) {
                radio.domElement.checked = curChecked;
              }

              storage.setValue(radio.id, {
                value: curChecked
              });
            }
          }
        };

        this._dispatchEventFromSandbox(actions, jsEvent);
      });

      this._setEventListeners(element, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], event => event.target.checked);
    }

    this._setBackgroundColor(element);

    this._setDefaultPropertiesFromJS(element);

    this.container.appendChild(element);
    return this.container;
  }

}

class PushButtonWidgetAnnotationElement extends LinkAnnotationElement {
  constructor(parameters) {
    super(parameters, {
      ignoreBorder: parameters.data.hasAppearance
    });
  }

  render() {
    const container = super.render();
    container.className = "buttonWidgetAnnotation pushButton";

    if (this.data.alternativeText) {
      container.title = this.data.alternativeText;
    }

    this._setDefaultPropertiesFromJS(container);

    return container;
  }

}

class ChoiceWidgetAnnotationElement extends WidgetAnnotationElement {
  constructor(parameters) {
    super(parameters, {
      isRenderable: parameters.renderForms
    });
  }

  render() {
    this.container.className = "choiceWidgetAnnotation";
    const storage = this.annotationStorage;
    const id = this.data.id;
    const storedData = storage.getValue(id, {
      value: this.data.fieldValue
    });
    let {
      fontSize
    } = this.data.defaultAppearanceData;

    if (!fontSize) {
      fontSize = 9;
    }

    const fontSizeStyle = `calc(${fontSize}px * var(--zoom-factor))`;
    const selectElement = document.createElement("select");
    GetElementsByNameSet.add(selectElement);
    selectElement.disabled = this.data.readOnly;
    selectElement.name = this.data.fieldName;
    selectElement.setAttribute("id", id);
    selectElement.tabIndex = DEFAULT_TAB_INDEX;
    selectElement.style.fontSize = `${fontSize}px`;

    if (!this.data.combo) {
      selectElement.size = this.data.options.length;

      if (this.data.multiSelect) {
        selectElement.multiple = true;
      }
    }

    selectElement.addEventListener("resetform", event => {
      const defaultValue = this.data.defaultFieldValue;

      for (const option of selectElement.options) {
        option.selected = option.value === defaultValue;
      }
    });

    for (const option of this.data.options) {
      const optionElement = document.createElement("option");
      optionElement.textContent = option.displayValue;
      optionElement.value = option.exportValue;

      if (this.data.combo) {
        optionElement.style.fontSize = fontSizeStyle;
      }

      if (storedData.value.includes(option.exportValue)) {
        optionElement.setAttribute("selected", true);
      }

      selectElement.appendChild(optionElement);
    }

    const getValue = (event, isExport) => {
      const name = isExport ? "value" : "textContent";
      const options = event.target.options;

      if (!event.target.multiple) {
        return options.selectedIndex === -1 ? null : options[options.selectedIndex][name];
      }

      return Array.prototype.filter.call(options, option => option.selected).map(option => option[name]);
    };

    const getItems = event => {
      const options = event.target.options;
      return Array.prototype.map.call(options, option => {
        return {
          displayValue: option.textContent,
          exportValue: option.value
        };
      });
    };

    if (this.enableScripting && this.hasJSActions) {
      selectElement.addEventListener("updatefromsandbox", jsEvent => {
        const actions = {
          value(event) {
            const value = event.detail.value;
            const values = new Set(Array.isArray(value) ? value : [value]);

            for (const option of selectElement.options) {
              option.selected = values.has(option.value);
            }

            storage.setValue(id, {
              value: getValue(event, true)
            });
          },

          multipleSelection(event) {
            selectElement.multiple = true;
          },

          remove(event) {
            const options = selectElement.options;
            const index = event.detail.remove;
            options[index].selected = false;
            selectElement.remove(index);

            if (options.length > 0) {
              const i = Array.prototype.findIndex.call(options, option => option.selected);

              if (i === -1) {
                options[0].selected = true;
              }
            }

            storage.setValue(id, {
              value: getValue(event, true),
              items: getItems(event)
            });
          },

          clear(event) {
            while (selectElement.length !== 0) {
              selectElement.remove(0);
            }

            storage.setValue(id, {
              value: null,
              items: []
            });
          },

          insert(event) {
            const {
              index,
              displayValue,
              exportValue
            } = event.detail.insert;
            const optionElement = document.createElement("option");
            optionElement.textContent = displayValue;
            optionElement.value = exportValue;
            selectElement.insertBefore(optionElement, selectElement.children[index]);
            storage.setValue(id, {
              value: getValue(event, true),
              items: getItems(event)
            });
          },

          items(event) {
            const {
              items
            } = event.detail;

            while (selectElement.length !== 0) {
              selectElement.remove(0);
            }

            for (const item of items) {
              const {
                displayValue,
                exportValue
              } = item;
              const optionElement = document.createElement("option");
              optionElement.textContent = displayValue;
              optionElement.value = exportValue;
              selectElement.appendChild(optionElement);
            }

            if (selectElement.options.length > 0) {
              selectElement.options[0].selected = true;
            }

            storage.setValue(id, {
              value: getValue(event, true),
              items: getItems(event)
            });
          },

          indices(event) {
            const indices = new Set(event.detail.indices);

            for (const option of event.target.options) {
              option.selected = indices.has(option.index);
            }

            storage.setValue(id, {
              value: getValue(event, true)
            });
          },

          editable(event) {
            event.target.disabled = !event.detail.editable;
          }

        };

        this._dispatchEventFromSandbox(actions, jsEvent);
      });
      selectElement.addEventListener("input", event => {
        const exportValue = getValue(event, true);
        const value = getValue(event, false);
        storage.setValue(id, {
          value: exportValue
        });
        this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
          source: this,
          detail: {
            id,
            name: "Keystroke",
            value,
            changeEx: exportValue,
            willCommit: true,
            commitKey: 1,
            keyDown: false
          }
        });
      });

      this._setEventListeners(selectElement, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"], ["input", "Action"]], event => event.target.checked);
    } else {
      selectElement.addEventListener("input", function (event) {
        storage.setValue(id, {
          value: getValue(event, true)
        });
      });
    }

    this._setBackgroundColor(selectElement);

    this._setDefaultPropertiesFromJS(selectElement);

    this.container.appendChild(selectElement);
    return this.container;
  }

}

class PopupAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.titleObj?.str || parameters.data.contentsObj?.str || parameters.data.richText?.str);
    super(parameters, {
      isRenderable
    });
  }

  render() {
    const IGNORE_TYPES = ["Line", "Square", "Circle", "PolyLine", "Polygon", "Ink"];
    this.container.className = "popupAnnotation";

    if (IGNORE_TYPES.includes(this.data.parentType)) {
      return this.container;
    }

    const selector = `[data-annotation-id="${this.data.parentId}"]`;
    const parentElements = this.layer.querySelectorAll(selector);

    if (parentElements.length === 0) {
      return this.container;
    }

    const popup = new PopupElement({
      container: this.container,
      trigger: Array.from(parentElements),
      color: this.data.color,
      titleObj: this.data.titleObj,
      modificationDate: this.data.modificationDate,
      contentsObj: this.data.contentsObj,
      richText: this.data.richText
    });
    const page = this.page;

    const rect = _util.Util.normalizeRect([this.data.parentRect[0], page.view[3] - this.data.parentRect[1] + page.view[1], this.data.parentRect[2], page.view[3] - this.data.parentRect[3] + page.view[1]]);

    const popupLeft = rect[0] + this.data.parentRect[2] - this.data.parentRect[0];
    const popupTop = rect[1];
    this.container.style.transformOrigin = `${-popupLeft}px ${-popupTop}px`;
    this.container.style.left = `${popupLeft}px`;
    this.container.style.top = `${popupTop}px`;
    this.container.appendChild(popup.render());
    return this.container;
  }

}

class PopupElement {
  constructor(parameters) {
    this.container = parameters.container;
    this.trigger = parameters.trigger;
    this.color = parameters.color;
    this.titleObj = parameters.titleObj;
    this.modificationDate = parameters.modificationDate;
    this.contentsObj = parameters.contentsObj;
    this.richText = parameters.richText;
    this.hideWrapper = parameters.hideWrapper || false;
    this.pinned = false;
  }

  render() {
    const BACKGROUND_ENLIGHT = 0.7;
    const wrapper = document.createElement("div");
    wrapper.className = "popupWrapper";
    this.hideElement = this.hideWrapper ? wrapper : this.container;
    this.hideElement.hidden = true;
    const popup = document.createElement("div");
    popup.className = "popup";
    const color = this.color;

    if (color) {
      const r = BACKGROUND_ENLIGHT * (255 - color[0]) + color[0];
      const g = BACKGROUND_ENLIGHT * (255 - color[1]) + color[1];
      const b = BACKGROUND_ENLIGHT * (255 - color[2]) + color[2];
      popup.style.backgroundColor = _util.Util.makeHexColor(r | 0, g | 0, b | 0);
    }

    const title = document.createElement("h1");
    title.dir = this.titleObj.dir;
    title.textContent = this.titleObj.str;
    popup.appendChild(title);

    const dateObject = _display_utils.PDFDateString.toDateObject(this.modificationDate);

    if (dateObject) {
      const modificationDate = document.createElement("span");
      modificationDate.className = "popupDate";
      modificationDate.textContent = "{{date}}, {{time}}";
      modificationDate.dataset.l10nId = "annotation_date_string";
      modificationDate.dataset.l10nArgs = JSON.stringify({
        date: dateObject.toLocaleDateString(),
        time: dateObject.toLocaleTimeString()
      });
      popup.appendChild(modificationDate);
    }

    if (this.richText?.str && (!this.contentsObj?.str || this.contentsObj.str === this.richText.str)) {
      _xfa_layer.XfaLayer.render({
        xfaHtml: this.richText.html,
        intent: "richText",
        div: popup
      });

      popup.lastChild.className = "richText popupContent";
    } else {
      const contents = this._formatContents(this.contentsObj);

      popup.appendChild(contents);
    }

    if (!Array.isArray(this.trigger)) {
      this.trigger = [this.trigger];
    }

    for (const element of this.trigger) {
      element.addEventListener("click", this._toggle.bind(this));
      element.addEventListener("mouseover", this._show.bind(this, false));
      element.addEventListener("mouseout", this._hide.bind(this, false));
    }

    popup.addEventListener("click", this._hide.bind(this, true));
    wrapper.appendChild(popup);
    return wrapper;
  }

  _formatContents({
    str,
    dir
  }) {
    const p = document.createElement("p");
    p.className = "popupContent";
    p.dir = dir;
    const lines = str.split(/(?:\r\n?|\n)/);

    for (let i = 0, ii = lines.length; i < ii; ++i) {
      const line = lines[i];
      p.appendChild(document.createTextNode(line));

      if (i < ii - 1) {
        p.appendChild(document.createElement("br"));
      }
    }

    return p;
  }

  _toggle() {
    if (this.pinned) {
      this._hide(true);
    } else {
      this._show(true);
    }
  }

  _show(pin = false) {
    if (pin) {
      this.pinned = true;
    }

    if (this.hideElement.hidden) {
      this.hideElement.hidden = false;
      this.container.style.zIndex += 1;
    }
  }

  _hide(unpin = true) {
    if (unpin) {
      this.pinned = false;
    }

    if (!this.hideElement.hidden && !this.pinned) {
      this.hideElement.hidden = true;
      this.container.style.zIndex -= 1;
    }
  }

}

class FreeTextAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.titleObj?.str || parameters.data.contentsObj?.str || parameters.data.richText?.str);
    super(parameters, {
      isRenderable,
      ignoreBorder: true
    });
  }

  render() {
    this.container.className = "freeTextAnnotation";

    if (!this.data.hasPopup) {
      this._createPopup(null, this.data);
    }

    return this.container;
  }

}

class LineAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.titleObj?.str || parameters.data.contentsObj?.str || parameters.data.richText?.str);
    super(parameters, {
      isRenderable,
      ignoreBorder: true
    });
  }

  render() {
    this.container.className = "lineAnnotation";
    const data = this.data;
    const {
      width,
      height
    } = getRectDims(data.rect);
    const svg = this.svgFactory.create(width, height);
    const line = this.svgFactory.createElement("svg:line");
    line.setAttribute("x1", data.rect[2] - data.lineCoordinates[0]);
    line.setAttribute("y1", data.rect[3] - data.lineCoordinates[1]);
    line.setAttribute("x2", data.rect[2] - data.lineCoordinates[2]);
    line.setAttribute("y2", data.rect[3] - data.lineCoordinates[3]);
    line.setAttribute("stroke-width", data.borderStyle.width || 1);
    line.setAttribute("stroke", "transparent");
    line.setAttribute("fill", "transparent");
    svg.appendChild(line);
    this.container.append(svg);

    this._createPopup(line, data);

    return this.container;
  }

}

class SquareAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.titleObj?.str || parameters.data.contentsObj?.str || parameters.data.richText?.str);
    super(parameters, {
      isRenderable,
      ignoreBorder: true
    });
  }

  render() {
    this.container.className = "squareAnnotation";
    const data = this.data;
    const {
      width,
      height
    } = getRectDims(data.rect);
    const svg = this.svgFactory.create(width, height);
    const borderWidth = data.borderStyle.width;
    const square = this.svgFactory.createElement("svg:rect");
    square.setAttribute("x", borderWidth / 2);
    square.setAttribute("y", borderWidth / 2);
    square.setAttribute("width", width - borderWidth);
    square.setAttribute("height", height - borderWidth);
    square.setAttribute("stroke-width", borderWidth || 1);
    square.setAttribute("stroke", "transparent");
    square.setAttribute("fill", "transparent");
    svg.appendChild(square);
    this.container.append(svg);

    this._createPopup(square, data);

    return this.container;
  }

}

class CircleAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.titleObj?.str || parameters.data.contentsObj?.str || parameters.data.richText?.str);
    super(parameters, {
      isRenderable,
      ignoreBorder: true
    });
  }

  render() {
    this.container.className = "circleAnnotation";
    const data = this.data;
    const {
      width,
      height
    } = getRectDims(data.rect);
    const svg = this.svgFactory.create(width, height);
    const borderWidth = data.borderStyle.width;
    const circle = this.svgFactory.createElement("svg:ellipse");
    circle.setAttribute("cx", width / 2);
    circle.setAttribute("cy", height / 2);
    circle.setAttribute("rx", width / 2 - borderWidth / 2);
    circle.setAttribute("ry", height / 2 - borderWidth / 2);
    circle.setAttribute("stroke-width", borderWidth || 1);
    circle.setAttribute("stroke", "transparent");
    circle.setAttribute("fill", "transparent");
    svg.appendChild(circle);
    this.container.append(svg);

    this._createPopup(circle, data);

    return this.container;
  }

}

class PolylineAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.titleObj?.str || parameters.data.contentsObj?.str || parameters.data.richText?.str);
    super(parameters, {
      isRenderable,
      ignoreBorder: true
    });
    this.containerClassName = "polylineAnnotation";
    this.svgElementName = "svg:polyline";
  }

  render() {
    this.container.className = this.containerClassName;
    const data = this.data;
    const {
      width,
      height
    } = getRectDims(data.rect);
    const svg = this.svgFactory.create(width, height);
    let points = [];

    for (const coordinate of data.vertices) {
      const x = coordinate.x - data.rect[0];
      const y = data.rect[3] - coordinate.y;
      points.push(x + "," + y);
    }

    points = points.join(" ");
    const polyline = this.svgFactory.createElement(this.svgElementName);
    polyline.setAttribute("points", points);
    polyline.setAttribute("stroke-width", data.borderStyle.width || 1);
    polyline.setAttribute("stroke", "transparent");
    polyline.setAttribute("fill", "transparent");
    svg.appendChild(polyline);
    this.container.append(svg);

    this._createPopup(polyline, data);

    return this.container;
  }

}

class PolygonAnnotationElement extends PolylineAnnotationElement {
  constructor(parameters) {
    super(parameters);
    this.containerClassName = "polygonAnnotation";
    this.svgElementName = "svg:polygon";
  }

}

class CaretAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.titleObj?.str || parameters.data.contentsObj?.str || parameters.data.richText?.str);
    super(parameters, {
      isRenderable,
      ignoreBorder: true
    });
  }

  render() {
    this.container.className = "caretAnnotation";

    if (!this.data.hasPopup) {
      this._createPopup(null, this.data);
    }

    return this.container;
  }

}

class InkAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.titleObj?.str || parameters.data.contentsObj?.str || parameters.data.richText?.str);
    super(parameters, {
      isRenderable,
      ignoreBorder: true
    });
    this.containerClassName = "inkAnnotation";
    this.svgElementName = "svg:polyline";
  }

  render() {
    this.container.className = this.containerClassName;
    const data = this.data;
    const {
      width,
      height
    } = getRectDims(data.rect);
    const svg = this.svgFactory.create(width, height);

    for (const inkList of data.inkLists) {
      let points = [];

      for (const coordinate of inkList) {
        const x = coordinate.x - data.rect[0];
        const y = data.rect[3] - coordinate.y;
        points.push(`${x},${y}`);
      }

      points = points.join(" ");
      const polyline = this.svgFactory.createElement(this.svgElementName);
      polyline.setAttribute("points", points);
      polyline.setAttribute("stroke-width", data.borderStyle.width || 1);
      polyline.setAttribute("stroke", "transparent");
      polyline.setAttribute("fill", "transparent");

      this._createPopup(polyline, data);

      svg.appendChild(polyline);
    }

    this.container.append(svg);
    return this.container;
  }

}

class HighlightAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.titleObj?.str || parameters.data.contentsObj?.str || parameters.data.richText?.str);
    super(parameters, {
      isRenderable,
      ignoreBorder: true,
      createQuadrilaterals: true
    });
  }

  render() {
    if (!this.data.hasPopup) {
      this._createPopup(null, this.data);
    }

    if (this.quadrilaterals) {
      return this._renderQuadrilaterals("highlightAnnotation");
    }

    this.container.className = "highlightAnnotation";
    return this.container;
  }

}

class UnderlineAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.titleObj?.str || parameters.data.contentsObj?.str || parameters.data.richText?.str);
    super(parameters, {
      isRenderable,
      ignoreBorder: true,
      createQuadrilaterals: true
    });
  }

  render() {
    if (!this.data.hasPopup) {
      this._createPopup(null, this.data);
    }

    if (this.quadrilaterals) {
      return this._renderQuadrilaterals("underlineAnnotation");
    }

    this.container.className = "underlineAnnotation";
    return this.container;
  }

}

class SquigglyAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.titleObj?.str || parameters.data.contentsObj?.str || parameters.data.richText?.str);
    super(parameters, {
      isRenderable,
      ignoreBorder: true,
      createQuadrilaterals: true
    });
  }

  render() {
    if (!this.data.hasPopup) {
      this._createPopup(null, this.data);
    }

    if (this.quadrilaterals) {
      return this._renderQuadrilaterals("squigglyAnnotation");
    }

    this.container.className = "squigglyAnnotation";
    return this.container;
  }

}

class StrikeOutAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.titleObj?.str || parameters.data.contentsObj?.str || parameters.data.richText?.str);
    super(parameters, {
      isRenderable,
      ignoreBorder: true,
      createQuadrilaterals: true
    });
  }

  render() {
    if (!this.data.hasPopup) {
      this._createPopup(null, this.data);
    }

    if (this.quadrilaterals) {
      return this._renderQuadrilaterals("strikeoutAnnotation");
    }

    this.container.className = "strikeoutAnnotation";
    return this.container;
  }

}

class StampAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    const isRenderable = !!(parameters.data.hasPopup || parameters.data.titleObj?.str || parameters.data.contentsObj?.str || parameters.data.richText?.str);
    super(parameters, {
      isRenderable,
      ignoreBorder: true
    });
  }

  render() {
    this.container.className = "stampAnnotation";

    if (!this.data.hasPopup) {
      this._createPopup(null, this.data);
    }

    return this.container;
  }

}

class FileAttachmentAnnotationElement extends AnnotationElement {
  constructor(parameters) {
    super(parameters, {
      isRenderable: true
    });
    const {
      filename,
      content
    } = this.data.file;
    this.filename = (0, _display_utils.getFilenameFromUrl)(filename);
    this.content = content;
    this.linkService.eventBus?.dispatch("fileattachmentannotation", {
      source: this,
      filename,
      content
    });
  }

  render() {
    this.container.className = "fileAttachmentAnnotation";
    const trigger = document.createElement("div");
    trigger.style.height = this.container.style.height;
    trigger.style.width = this.container.style.width;
    trigger.addEventListener("dblclick", this._download.bind(this));

    if (!this.data.hasPopup && (this.data.titleObj?.str || this.data.contentsObj?.str || this.data.richText)) {
      this._createPopup(trigger, this.data);
    }

    this.container.appendChild(trigger);
    return this.container;
  }

  _download() {
    this.downloadManager?.openOrDownloadData(this.container, this.content, this.filename);
  }

}

class AnnotationLayer {
  static render(parameters) {
    const sortedAnnotations = [],
          popupAnnotations = [];

    for (const data of parameters.annotations) {
      if (!data) {
        continue;
      }

      const {
        width,
        height
      } = getRectDims(data.rect);

      if (width <= 0 || height <= 0) {
        continue;
      }

      if (data.annotationType === _util.AnnotationType.POPUP) {
        popupAnnotations.push(data);
        continue;
      }

      sortedAnnotations.push(data);
    }

    if (popupAnnotations.length) {
      sortedAnnotations.push(...popupAnnotations);
    }

    const div = parameters.div;

    for (const data of sortedAnnotations) {
      const element = AnnotationElementFactory.create({
        data,
        layer: div,
        page: parameters.page,
        viewport: parameters.viewport,
        linkService: parameters.linkService,
        downloadManager: parameters.downloadManager,
        imageResourcesPath: parameters.imageResourcesPath || "",
        renderForms: parameters.renderForms !== false,
        svgFactory: new _display_utils.DOMSVGFactory(),
        annotationStorage: parameters.annotationStorage || new _annotation_storage.AnnotationStorage(),
        enableScripting: parameters.enableScripting,
        hasJSActions: parameters.hasJSActions,
        fieldObjects: parameters.fieldObjects,
        mouseState: parameters.mouseState || {
          isDown: false
        }
      });

      if (element.isRenderable) {
        const rendered = element.render();

        if (data.hidden) {
          rendered.style.visibility = "hidden";
        }

        if (Array.isArray(rendered)) {
          for (const renderedElement of rendered) {
            div.appendChild(renderedElement);
          }
        } else {
          if (element instanceof PopupAnnotationElement) {
            div.prepend(rendered);
          } else {
            div.appendChild(rendered);
          }
        }
      }
    }

    this.#setAnnotationCanvasMap(div, parameters.annotationCanvasMap);
  }

  static update(parameters) {
    const {
      page,
      viewport,
      annotations,
      annotationCanvasMap,
      div
    } = parameters;
    const transform = viewport.transform;
    const matrix = `matrix(${transform.join(",")})`;
    let scale, ownMatrix;

    for (const data of annotations) {
      const elements = div.querySelectorAll(`[data-annotation-id="${data.id}"]`);

      if (elements) {
        for (const element of elements) {
          if (data.hasOwnCanvas) {
            const rect = _util.Util.normalizeRect([data.rect[0], page.view[3] - data.rect[1] + page.view[1], data.rect[2], page.view[3] - data.rect[3] + page.view[1]]);

            if (!ownMatrix) {
              scale = Math.abs(transform[0] || transform[1]);
              const ownTransform = transform.slice();

              for (let i = 0; i < 4; i++) {
                ownTransform[i] = Math.sign(ownTransform[i]);
              }

              ownMatrix = `matrix(${ownTransform.join(",")})`;
            }

            const left = rect[0] * scale;
            const top = rect[1] * scale;
            element.style.left = `${left}px`;
            element.style.top = `${top}px`;
            element.style.transformOrigin = `${-left}px ${-top}px`;
            element.style.transform = ownMatrix;
          } else {
            element.style.transform = matrix;
          }
        }
      }
    }

    this.#setAnnotationCanvasMap(div, annotationCanvasMap);
    div.hidden = false;
  }

  static #setAnnotationCanvasMap(div, annotationCanvasMap) {
    if (!annotationCanvasMap) {
      return;
    }

    for (const [id, canvas] of annotationCanvasMap) {
      const element = div.querySelector(`[data-annotation-id="${id}"]`);

      if (!element) {
        continue;
      }

      const {
        firstChild
      } = element;

      if (firstChild.nodeName === "CANVAS") {
        element.replaceChild(canvas, firstChild);
      } else {
        element.insertBefore(canvas, firstChild);
      }
    }

    annotationCanvasMap.clear();
  }

}

exports.AnnotationLayer = AnnotationLayer;