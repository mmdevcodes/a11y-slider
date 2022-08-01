export declare const createElement: (html: string) => HTMLElement;
/**
 * a11yclick - Easily handle keyboard click events on non semantic button elements.
 * https://github.com/svinkle/a11yclick
 * @param {Object} event Click/keyboard event object.
 * @returns {Boolean} Returns true or false depending on event type and code.
 */
export declare const a11yClick: (event: any) => boolean;
export declare const crossCustomEvent: (event: string, params: any) => CustomEvent<any>;
export declare const isInteger: (value: any) => boolean;
export declare const isObject: (value: any) => boolean;
export declare const canAccessAsArray: (item: any) => boolean;
export declare const everyElement: (elements: HTMLElement | HTMLCollectionOf<HTMLElement> | HTMLCollection | NodeList | HTMLElement[] | undefined, callback?: ((element: HTMLElement) => void) | undefined) => void;
/**
 * Get computed width/height with subpixels
 * https://github.com/Vestride/glen.codes/blob/master/src/posts/getting-element-width.md
 */
export declare const getSubpixelStyle: (element: HTMLElement, style: "width" | "height", styles?: CSSStyleDeclaration | undefined) => number;
export declare const getPreviousSiblings: (element: HTMLElement, amount?: number) => HTMLElement[];
export declare const getNextSiblings: (element: HTMLElement, amount?: number) => HTMLElement[];
export declare const isPlatformiOS: () => boolean;
