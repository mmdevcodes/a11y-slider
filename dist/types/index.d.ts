import 'core-js/es/object/assign';
import 'core-js/es/symbol/iterator';
import './index.css';
interface Options {
    navBtns: Boolean;
    prevBtn: HTMLElement | HTMLCollectionOf<HTMLElement> | NodeList;
    nextBtn: HTMLElement | HTMLCollectionOf<HTMLElement> | NodeList;
    dots: Boolean;
}
declare enum SliderState {
    Enabled = 0,
    Disabled = 1
}
export default class A11YSlider {
    private activeClass;
    private visibleClass;
    private sliderClass;
    private hasCustomBtns;
    private _checkShouldEnableDebounced;
    slider: HTMLElement;
    slides: HTMLCollectionOf<HTMLElement>;
    activeSlide: HTMLElement;
    visibleSlides: HTMLElement[];
    sliderContainer: HTMLElement;
    options: Options;
    sliderEnabled: SliderState;
    constructor(element: HTMLElement, options?: Options);
    init(): void;
    private _checkShouldEnable;
    private _enableSlider;
    private _disableSlider;
    private _setCSS;
    private _removeCSS;
    private _goPrevOrNext;
    scrollToSlide(targetSlide: HTMLElement): void;
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
