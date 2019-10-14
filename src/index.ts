import 'core-js/es/object/assign';
import 'core-js/es/symbol/iterator';
import { debounce } from 'ts-debounce';
import { createElement, a11yClick, crossCustomEvent } from './utils';
import './index.css';

interface Options {
    navBtns: Boolean,
    prevBtn: HTMLElement | HTMLCollectionOf<HTMLElement> | NodeList,
    nextBtn: HTMLElement | HTMLCollectionOf<HTMLElement> | NodeList,
    dots: Boolean,
}

interface ActiveVisibleSlides {
    (visibleSlides: HTMLElement[], activeSlide: HTMLElement): void;
}

enum SlideDirection {
    Prev,
    Next
}

enum SliderState {
    Enabled,
    Disabled
}

export default class A11YSlider {
    private activeClass: string;
    private visibleClass: string;
    private sliderClass: string;
    private hasCustomBtns: boolean;
    private _checkShouldEnableDebounced: any;
    public slider: HTMLElement;
    public slides: HTMLCollectionOf<HTMLElement>;
    public activeSlide: HTMLElement;
    public visibleSlides: HTMLElement[];
    public sliderContainer: HTMLElement;
    public options: Options;
    public sliderEnabled: SliderState;

    constructor(element: HTMLElement, options?: Options) {
        this.slider = element;
        this.slides = element.children as HTMLCollectionOf<HTMLElement>;
        this.sliderContainer = createElement('<div class="a11y-slider-container"></div>');
        this.activeClass = 'a11y-slider-active';
        this.visibleClass = 'a11y-slider-visible';
        this.sliderClass = 'a11y-slider';
        this.activeSlide = this.slides[0];
        this.visibleSlides = [];
        this.sliderEnabled = SliderState.Disabled;
        this.hasCustomBtns = options && options.prevBtn || options && options.nextBtn ? true : false;
        this.options = {
            navBtns: true,
            prevBtn: options && options.prevBtn || createElement('<button class="a11y-slider-prev">Previous slide</button>'),
            nextBtn: options && options.nextBtn || createElement('<button class="a11y-slider-next">Next slide</button>'),
            dots: true
        };

        // Set user-inputted options if available
        Object.assign(this.options, options);

        // Binding
        this._handlePrev = this._handlePrev.bind(this);
        this._handleNext = this._handleNext.bind(this);
        this._checkShouldEnableDebounced = debounce(this._checkShouldEnable.bind(this), 250);
        this._handleScroll = debounce(this._handleScroll.bind(this), 150); // May fire twice depending on browser

        // Initialize slider
        this.init();
    }

    init() {
        // Check if the slider should be initialized depending on slides shown
        this._checkShouldEnable();

        // Enable/disable slider after resize
        window.addEventListener('resize', this._checkShouldEnableDebounced);

        this._dispatchEvent('init', this);
    }

    private _checkShouldEnable() {
        let shouldEnable: boolean = true;

        // If 1 or less slides exist then a slider is not needed
        if (this.slides.length <= 1) shouldEnable = false;

        // If there are no slides outside the slider's viewport a slider is not needed
        this._getActiveAndVisible((visibleSlides: HTMLElement[]) => {
            if (visibleSlides.length === this.slides.length) shouldEnable = false;
        });

        // Enable/disable slider based on above requirements
        if (shouldEnable && this.sliderEnabled === SliderState.Disabled) {
            this._enableSlider();
        } else if (!shouldEnable && this.sliderEnabled === SliderState.Enabled) {
            this._disableSlider();
        }
    }

     // Enable all functionality for the slider. Should mirror _disableSlider()
    private _enableSlider() {
        // Set slider to enabled
        this.sliderEnabled = SliderState.Enabled;

        // Add slider container to DOM and move slider into it
        this.slider.insertAdjacentElement('beforebegin', this.sliderContainer);
        this.sliderContainer.insertAdjacentElement('afterbegin', this.slider);

        // If prev/next buttons are enabled and user isn't using their own add it to the DOM
        if (this.options.navBtns && !this.hasCustomBtns) {
            if (this.options.prevBtn instanceof HTMLElement) {
                this.sliderContainer.insertAdjacentElement('afterbegin', this.options.prevBtn);
            }

            if (this.options.nextBtn instanceof HTMLElement) {
                this.sliderContainer.insertAdjacentElement('afterbegin', this.options.nextBtn);
            }
        }

        // Add event listeners for prev/next buttons. Possible for there to be multiple so need to loop through them all
        const prevBtns = this.options.prevBtn instanceof HTMLElement ? [this.options.prevBtn] : this.options.prevBtn;
        const nextBtns = this.options.nextBtn instanceof HTMLElement ? [this.options.nextBtn] : this.options.nextBtn;

        for (let prevBtn of prevBtns) {
            prevBtn.addEventListener('click', this._handlePrev);
            prevBtn.addEventListener('keypress', this._handlePrev);
        }

        for (let nextBtn of nextBtns) {
            nextBtn.addEventListener('click', this._handleNext);
            nextBtn.addEventListener('keypress', this._handleNext);
        }

        // Add listener for when the slider stops moving
        this.slider.addEventListener('scroll', this._handleScroll, false);

        // Add all CSS needed
        this._setCSS();
    }

    // Disable all functionality for the slider. Should mirror _enableSlider()
    private _disableSlider() {
        this.sliderEnabled = SliderState.Disabled;

        // Remove slider from a11y-slider's container and then remove container from DOM
        if (document.body.contains(this.sliderContainer)) {
            this.sliderContainer.insertAdjacentElement('beforebegin', this.slider);
            this.sliderContainer.parentNode!.removeChild(this.sliderContainer);
        }

        // Event listeners for prev/next buttons. Possible for there to be multiple so need to loop through them all
        const prevBtns = this.options.prevBtn instanceof HTMLElement ? [this.options.prevBtn] : this.options.prevBtn;
        const nextBtns = this.options.nextBtn instanceof HTMLElement ? [this.options.nextBtn] : this.options.nextBtn;

        for (let prevBtn of prevBtns) {
            prevBtn.removeEventListener('click', this._handlePrev);
            prevBtn.removeEventListener('keypress', this._handlePrev);
        }

        for (let nextBtn of nextBtns) {
            nextBtn.removeEventListener('click', this._handleNext);
            nextBtn.removeEventListener('keypress', this._handleNext);
        }

        // Remove listener for when the slider stops moving
        this.slider.removeEventListener('scroll', this._handleScroll, false);

        // Remove all CSS
        this._removeCSS();
    }

    // Add all CSS needed for the slider. Should mirror _removeCSS()
    private _setCSS() {
        // Update slider instance to get the correct elements
        this._getActiveAndVisible();

        // Add main slider class if it doesn't have it already
        this.slider.classList.add(this.sliderClass);

        // Reset the more dynamic CSS first if it exists
        for (let slide of this.slides) {
            slide.classList.remove(this.activeClass);
            slide.classList.remove(this.visibleClass);
        }

        // Add in active/visible classes
        this.activeSlide.classList.add(this.activeClass);

        for (let slide of this.visibleSlides) {
            slide.classList.add(this.visibleClass);
        }
    }

    // Remove all CSS needed for the slider. Should mirror _setCSS()
    private _removeCSS() {
        // Remove class to slider
        this.slider.classList.remove(this.sliderClass);

        // Reset all the dynamic classes
        for (let slide of this.slides) {
            slide.classList.remove(this.activeClass);
            slide.classList.remove(this.visibleClass);
        }
    }

    private _goPrevOrNext(direction: SlideDirection) {
        this._getActiveAndVisible((visibleSlides: HTMLElement[], activeSlide: HTMLElement) => {
            const firstSlide = this.slider.firstElementChild as HTMLElement;
            const lastSlide = this.slider.lastElementChild as HTMLElement;
            const firstVisibleSlide = visibleSlides[0];
            const lastVisibleSlide = visibleSlides[visibleSlides.length - 1];

            if (direction === SlideDirection.Next) {
                // Wrap to the first slide if we're currently on the last
                if (lastVisibleSlide === lastSlide) {
                    this.scrollToSlide(firstSlide);
                } else {
                    this.scrollToSlide(activeSlide!.nextElementSibling as HTMLElement);
                }
            } else if (direction === SlideDirection.Prev) {
                // Wrap to the last slide if we're currently on the first
                if (firstVisibleSlide === firstSlide) {
                    this.scrollToSlide(lastSlide);
                } else {
                    this.scrollToSlide(activeSlide!.previousElementSibling as HTMLElement);
                }
            }
        });
    }

    public scrollToSlide(targetSlide: HTMLElement) {
        const modernBrowser: boolean = !!HTMLElement.prototype.scrollTo;

        // Dispatch custom event
        this._dispatchEvent('beforeChange', {
            currentSlide: this.activeSlide,
            nextSlide: targetSlide,
            a11ySlider: this
        });

        // Move slider to specific item
        if (modernBrowser) {
            this.slider.scroll({
                left: targetSlide.offsetLeft,
                behavior: 'smooth'
            });
        } else {
            this.slider.scrollLeft = targetSlide.offsetLeft;
        }
    }

    private _getActiveAndVisible(callback?: ActiveVisibleSlides) {
        let visibleSlides: HTMLElement[] = [];

        // Only detects items in the visible viewport of the parent element
        for (let slide of this.slides) {
            const sliderWidth = this.slider.clientWidth;
            const sliderPosition = this.slider.scrollLeft;
            const slideOffset = slide.offsetLeft;

            if (slideOffset >= sliderPosition && slideOffset < (sliderPosition + sliderWidth)) {
                visibleSlides.push(slide);
            }
        }

        this.visibleSlides = visibleSlides;
        this.activeSlide = visibleSlides[0];

        callback && callback(this.visibleSlides, this.activeSlide);
    }

    private _handlePrev(event: Event) {
        if (a11yClick(event) === true) this._goPrevOrNext(SlideDirection.Prev);
    }

    private _handleNext(event: Event) {
        if (a11yClick(event) === true) this._goPrevOrNext(SlideDirection.Next);
    }

    private _handleScroll() {
        // Update CSS
        this._setCSS();

        // Dispatch custom event
        this._dispatchEvent('afterChange', {
            currentSlide: this.activeSlide,
            a11ySlider: this
        });
    }

    private _dispatchEvent(eventName: string, detail: object) {
        const event = crossCustomEvent(eventName, { detail });

        this.slider.dispatchEvent(event);
    }

    /**
     * Nuke the slider
     */
    public destroy() {
        // Undos everything from _enableSlider()
        this._disableSlider();

        // Undos everything from init()
        window.removeEventListener('resize', this._checkShouldEnableDebounced);

        // Dispatch custom event
        this._dispatchEvent('destroy', {
            a11ySlider: this
        });
    }
}