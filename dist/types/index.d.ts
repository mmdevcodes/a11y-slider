import 'core-js/es/object/assign';
import 'core-js/es/symbol/iterator';
import './index.css';
interface Options {
    container: boolean;
    navBtns: boolean;
    prevBtn: HTMLElement | HTMLCollectionOf<HTMLElement> | NodeList;
    nextBtn: HTMLElement | HTMLCollectionOf<HTMLElement> | NodeList;
    dots: boolean;
    adaptiveHeight: boolean;
}
declare enum SliderState {
    Enabled = 0,
    Disabled = 1
}
export default class A11YSlider {
    private activeClass;
    private visibleClass;
    private dotsClass;
    private sliderClass;
    private hasCustomBtns;
    private _checkShouldEnableDebounced;
    slider: HTMLElement;
    slides: HTMLCollectionOf<HTMLElement>;
    dots: HTMLElement | null;
    activeSlide: HTMLElement;
    visibleSlides: HTMLElement[];
    sliderContainer: HTMLElement;
    options: Options;
    sliderEnabled: SliderState;
    constructor(element: HTMLElement, options?: Options);
    private _init;
    private _checkShouldEnable;
    private _enableSlider;
    private _disableSlider;
    private _setCSS;
    private _removeCSS;
    private _generateDots;
    private _removeDots;
    private _updateDots;
    private _goPrevOrNext;
    scrollToSlide(targetSlide: HTMLElement): void;
    /**
     * If element is passed slider's height will match
     *  it otherwise the height of the slider is removed.
     */
    private _updateHeight;
    private _getActiveAndVisible;
    private _handlePrev;
    private _handleNext;
    private _handleScroll;
    private _dispatchEvent;
    /**
     * Nuke the slider
     */
    destroy(): void;
}
export {};
