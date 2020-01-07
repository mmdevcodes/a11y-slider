interface AllElements {
    (element: HTMLElement): void;
}
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
export declare const everyElement: (elements: HTMLElement | HTMLCollectionOf<HTMLElement> | NodeList, callback?: AllElements | undefined) => void;
export {};
