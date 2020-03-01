export const createElement = (html: string): HTMLElement => {
    return new DOMParser().parseFromString(html, 'text/html').body.firstChild as HTMLElement;
}

/**
 * a11yclick - Easily handle keyboard click events on non semantic button elements.
 * https://github.com/svinkle/a11yclick
 * @param {Object} event Click/keyboard event object.
 * @returns {Boolean} Returns true or false depending on event type and code.
 */
export const a11yClick = function(event: any): boolean {
    'use strict';

    var code = event.charCode || event.keyCode,
        type = event.type;

    if (type === 'click') {
        return true;
    } else if (type === 'keydown') {
        if (code === 32 || code === 13) {
            event.preventDefault();
            return true;
        }
    }

    return false;
};

// Cross browser custom event
// Some code from https://github.com/shystruk/custom-event-js
export const crossCustomEvent = (event: string, params: any) => {
    var evt = document.createEvent('CustomEvent');

    params = params || { bubbles: false, cancelable: false, detail: undefined };
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);

    return evt;
}

// Checks if value is an integer
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger#Polyfill
export const isInteger = (value: any): boolean => {
  return typeof value === 'number' &&
    isFinite(value) &&
    Math.floor(value) === value &&
    ((value != null) &&
    !isNaN(Number(value.toString())));
};

export const isObject = (value: any): boolean => {
    return typeof value === 'object' && value !== null;
};

// https://stackoverflow.com/a/24048615
export const canAccessAsArray = (item: any): boolean => {
    if (Array.isArray(item)) {
        return true;
    }
    // modern browser such as IE9 / firefox / chrome etc.
    var result = Object.prototype.toString.call(item);
    if (result === "[object HTMLCollection]" || result === "[object NodeList]") {
        return true;
    }
    //ie 6/7/8
    if (typeof item !== "object" || !item.hasOwnProperty("length") || item.length < 0) {
        return false;
    }
    // a false positive on an empty pseudo-array is OK because there won't be anything
    // to iterate so we allow anything with .length === 0 to pass the test
    if (item.length === 0) {
        return true;
    } else if (item[0] && item[0].nodeType) {
        return true;
    }
    return false;
}

// Run a function on all elements even if it's a collection or single
export const everyElement = (elements: HTMLElement | HTMLCollectionOf<HTMLElement>| HTMLCollection | NodeList | HTMLElement[] | undefined, callback?: (element: HTMLElement) => void) => {
    // Return if nothing passed
    if (elements === undefined) return;

    // Wrap elements in an array if single
    let els = canAccessAsArray(elements) ? elements : [elements];

    // Oldschool array iterator method for IE (avoiding polyfills)
    Array.prototype.slice.call(els).forEach(function (el) {
        if (el instanceof HTMLElement) {
            callback && callback(el);
        }
    });
}

/**
 * Get computed width/height with subpixels
 * https://github.com/Vestride/glen.codes/blob/master/src/posts/getting-element-width.md
 */
export const getSubpixelStyle = (element: HTMLElement, style: 'width' | 'height', styles?: CSSStyleDeclaration) => {
    var HAS_COMPUTED_STYLE = !!window.getComputedStyle;
    var getStyles = window.getComputedStyle || function () { };

    var COMPUTED_SIZE_INCLUDES_PADDING = (function () {
        if (!HAS_COMPUTED_STYLE) {
            return false;
        }

        var parent = document.body || document.documentElement;
        var e = document.createElement('div');
        e.style.cssText = 'width:10px;padding:2px;' +
            '-webkit-box-sizing:border-box;box-sizing:border-box;';
        parent.appendChild(e);

        var width = getStyles(e, null).width;
        var ret = width === '10px';

        parent.removeChild(e);

        return ret;
    }());

    /**
     * Retrieve the computed style for an element, parsed as a float.
     * @param {Element} element Element to get style for.
     * @param {string} style Style property.
     * @param {CSSStyleDeclaration} [styles] Optionally include clean styles to
     *     use instead of asking for them again.
     * @return {number} The parsed computed value or zero if that fails because IE
     *     will return 'auto' when the element doesn't have margins instead of
     *     the computed style.
     */
    var getNumberStyle = function (el: HTMLElement, elStyle: 'width' | 'height', elStyles?: CSSStyleDeclaration) {
        if (HAS_COMPUTED_STYLE) {
            elStyles = elStyles || getStyles(el, null);
            var value = getFloat(elStyles[elStyle]);

            // Support IE<=11 and W3C spec.
            if (!COMPUTED_SIZE_INCLUDES_PADDING && elStyle === 'width') {
                value += getFloat(elStyles.paddingLeft) +
                    getFloat(elStyles.paddingRight) +
                    getFloat(elStyles.borderLeftWidth) +
                    getFloat(elStyles.borderRightWidth);
            } else if (!COMPUTED_SIZE_INCLUDES_PADDING && elStyle === 'height') {
                value += getFloat(elStyles.paddingTop) +
                    getFloat(elStyles.paddingBottom) +
                    getFloat(elStyles.borderTopWidth) +
                    getFloat(elStyles.borderBottomWidth);
            }

            return value;
        } else {
            return getFloat(el.style[elStyle]);
        }
    };

    var isNumber = function (n: any) {
        return !isNaN(parseFloat(n)) && isFinite(n) as boolean;
    }

    var getFloat = function (value: any) {
        value = parseFloat(value);
        return isNumber(value) ? value as number : 0
    };

    return getNumberStyle(element, style, styles);
}