import 'core-js/es/symbol/iterator';
import 'core-js/es/object/assign';
import './index.css';
interface Options {
    container: boolean;
    navBtns: boolean;
    prevBtn: HTMLElement | HTMLCollectionOf<HTMLElement> | NodeList;
    nextBtn: HTMLElement | HTMLCollectionOf<HTMLElement> | NodeList;
    dots: boolean;
    adaptiveHeight: boolean;
    skipBtn: boolean;
    slidesToShow: number | false;
}
declare enum SliderState {
    Enabled = 0,
    Disabled = 1
}
export default class A11YSlider {
    private _activeClass;
    private _visibleClass;
    private _dotsClass;
    private _sliderClass;
    private _hasCustomBtns;
    private _focusable;
    private _checkShouldEnableDebounced;
    private _updateHeightDebounced;
    private _updateScrollPosition;
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
    private _updateItemsCSS;
    private _removeItemsCSS;
    private _addFocusable;
    private _removeFocusable;
    private _addSkipBtn;
    private _removeSkipBtn;
    private _generateDots;
    private _getDotCount;
    private _removeDots;
    private _updateDots;
    private _goPrevOrNext;
    /**
     * Moves slider to target element
     */
    scrollToSlide(targetSlide: HTMLElement): void;
    /**
     * Update the options on the slider instance
     */
    updateOptions(options: Options): void;
    /**
     * If element is passed slider's height will match
     *  it otherwise the height of the slider is removed.
     */
    private _updateHeight;
    refreshHeight(): void;
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
