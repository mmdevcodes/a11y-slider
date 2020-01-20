import './index.css';
interface Options {
    container: boolean;
    arrows: boolean;
    prevArrow: HTMLElement | HTMLCollectionOf<HTMLElement> | NodeList;
    nextArrow: HTMLElement | HTMLCollectionOf<HTMLElement> | NodeList;
    dots: boolean;
    adaptiveHeight: boolean;
    skipBtn: boolean;
    slidesToShow: number | false;
    autoplay: boolean;
    autoplaySpeed: number;
    autoplayHoverPause: boolean;
    centerMode: boolean;
}
declare enum SliderState {
    Enabled = 1,
    Disabled = 0
}
export default class A11YSlider {
    private _activeClass;
    private _visibleClass;
    private _dotsClass;
    private _sliderClass;
    private _hasCustomArrows;
    private _focusable;
    private _checkShouldEnableDebounced;
    private _updateHeightDebounced;
    private _generateDotsDebounced;
    private _updateScrollPosition;
    private _autoplayTimer;
    private _autoplayBtn;
    private _pauseOnMouseLeave;
    private _skipBtns;
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
    private _enableAutoplay;
    private _disableAutoplay;
    private _toggleAutoplay;
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
    private _handleAutoplay;
    private _handleAutoplayHover;
    private _handleScroll;
    private _dispatchEvent;
    /**
     * Nuke the slider
     */
    destroy(): void;
}
export {};
