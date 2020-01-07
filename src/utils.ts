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
    Math.floor(value) === value;
};

// Run a function on all elements even if it's a collection or single
export const everyElement = (elements: HTMLElement | HTMLCollectionOf<HTMLElement> | NodeList, callback?: (element: HTMLElement) => void) => {
    const els = elements instanceof HTMLElement ? [elements] : elements;

    for (let el of els) {
        if (el instanceof HTMLElement) {
            callback && callback(el);
        }
    }
}