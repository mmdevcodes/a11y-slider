import 'core-js/es/symbol/iterator';
import 'core-js/es/object/assign';
import { debounce } from 'ts-debounce';
import { createElement, a11yClick, crossCustomEvent, isInteger, everyElement } from './utils';
import './index.css';

interface Options {
    container: boolean,
    navBtns: boolean,
    prevBtn: HTMLElement | HTMLCollectionOf<HTMLElement> | NodeList,
    nextBtn: HTMLElement | HTMLCollectionOf<HTMLElement> | NodeList,
    dots: boolean,
    adaptiveHeight: boolean,
    skipBtn: boolean,
    slidesToShow: number | false,
    autoplay: boolean,
    autoplaySpeed: number
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

enum AutoplayState {
    Enable,
    Disable
}

export default class A11YSlider {
    private _activeClass: string;
    private _visibleClass: string;
    private _dotsClass: string;
    private _sliderClass: string;
    private _hasCustomBtns: boolean;
    private _focusable: string;
    private _checkShouldEnableDebounced: any;
    private _updateHeightDebounced: any;
    private _updateScrollPosition: any;
    private _autoplayTimer: number;
    private _autoplayBtn: HTMLElement;
    public slider: HTMLElement;
    public slides: HTMLCollectionOf<HTMLElement>;
    public dots: HTMLElement | null;
    public activeSlide: HTMLElement;
    public visibleSlides: HTMLElement[];
    public sliderContainer: HTMLElement;
    public options: Options;
    public sliderEnabled: SliderState;

    constructor(element: HTMLElement, options?: Options) {
        this.slider = element;
        this.slides = element.children as HTMLCollectionOf<HTMLElement>;
        this.sliderContainer = createElement('<div class="a11y-slider-container"></div>');
        this._activeClass = 'a11y-slider-active';
        this._visibleClass = 'a11y-slider-visible';
        this._dotsClass = 'a11y-slider-dots';
        this._sliderClass = 'a11y-slider';
        this._focusable = 'a, area, input, select, textarea, button, iframe, object, embed, *[tabindex], *[contenteditable]';
        this._autoplayTimer = 0;
        this._autoplayBtn = createElement(`<button type="button" class="a11y-slider-autoplay">Toggle slider autoplay</button>`);
        this.dots = null;
        this.activeSlide = this.slides[0];
        this.visibleSlides = [];
        this.sliderEnabled = SliderState.Disabled;
        this._hasCustomBtns = options && options.prevBtn || options && options.nextBtn ? true : false;
        this.options = {
            container: true,
            navBtns: true,
            prevBtn: options && options.prevBtn || createElement('<button type="button" class="a11y-slider-prev">Previous slide</button>'),
            nextBtn: options && options.nextBtn || createElement('<button type="button" class="a11y-slider-next">Next slide</button>'),
            dots: true,
            adaptiveHeight: false,
            skipBtn: true,
            slidesToShow: false,
            autoplay: false,
            autoplaySpeed: 3000
        };

        // Set user-inputted options if available
        Object.assign(this.options, options);

        // Binding
        this._handlePrev = this._handlePrev.bind(this);
        this._handleNext = this._handleNext.bind(this);
        this._handleAutoplay = this._handleAutoplay.bind(this);
        this._checkShouldEnableDebounced = debounce(this._checkShouldEnable.bind(this), 250);
        this._updateHeightDebounced = debounce(this._updateHeight.bind(this), 250);
        this._updateScrollPosition = debounce(() => this.scrollToSlide(this.activeSlide), 250);
        this._handleScroll = debounce(this._handleScroll.bind(this), 150); // May fire twice depending on browser

        // Initialize slider
        this._init();
    }

    private _init() {
        // Check if the slider should be initialized depending on slides shown
        this._checkShouldEnable();

        // Enable/disable slider after resize
        window.addEventListener('resize', this._checkShouldEnableDebounced);

        this._dispatchEvent('init', {
            a11ySlider: this
        });
    }

    private _checkShouldEnable() {
        let shouldEnable: boolean = true;

        // If 1 or less slides exist then a slider is not needed
        if (this.slides.length <= 1) shouldEnable = false;

        // If there are no slides outside the slider's viewport a slider is not needed
        this._getActiveAndVisible((visibleSlides: HTMLElement[]) => {
            if (visibleSlides.length === this.slides.length) shouldEnable = false;
        });

        // If user explicitly set items to be shown and it's the same number as available
        if (this.slides.length === this.options.slidesToShow) shouldEnable = false;

        // Enable/disable slider based on above requirements
        if (shouldEnable && this.sliderEnabled === SliderState.Disabled) {
            this._enableSlider();
        } else if (!shouldEnable && this.sliderEnabled === SliderState.Enabled) {
            this._disableSlider();
        }

        // Custom buttons should be hidden if not initially enabled
        if (!shouldEnable && this._hasCustomBtns) {
            everyElement(this.options.prevBtn, prevBtn => {
                prevBtn.classList.add('a11y-slider-hide');
            });

            everyElement(this.options.nextBtn, nextBtn => {
                nextBtn.classList.add('a11y-slider-hide');
            });
        }
    }

     // Enable all functionality for the slider. Should mirror _disableSlider()
    private _enableSlider() {
        // Set slider to enabled
        this.sliderEnabled = SliderState.Enabled;

        // Add slider container to DOM and move slider into it if enabled
        if (this.options.container) {
            this.slider.insertAdjacentElement('beforebegin', this.sliderContainer);
            this.sliderContainer.insertAdjacentElement('afterbegin', this.slider);
        }

        // Add skip button before slider if enabled
        if (this.options.skipBtn) this._addSkipBtn();

        // If prev/next buttons are enabled and user isn't using their own add it to the DOM
        if (this.options.navBtns && !this._hasCustomBtns) {
            if (this.options.prevBtn instanceof HTMLElement) {
                this.slider.insertAdjacentElement('beforebegin', this.options.prevBtn);
            }

            if (this.options.nextBtn instanceof HTMLElement) {
                this.slider.insertAdjacentElement('beforebegin', this.options.nextBtn);
            }
        }

        // Possible for there to be multiple so need to loop through them all
        everyElement(this.options.prevBtn, prevBtn => {
            // Add event listeners for prev/next buttons
            prevBtn.addEventListener('click', this._handlePrev, { passive: true });
            prevBtn.addEventListener('keypress', this._handlePrev, { passive: true });

            if (this._hasCustomBtns) {
                // User generated buttons get special hide class removed
                prevBtn.classList.remove('a11y-slider-hide');
            }
        });

        everyElement(this.options.nextBtn, nextBtn => {
            // Add event listeners for prev/next buttons
            nextBtn.addEventListener('click', this._handleNext, { passive: true });
            nextBtn.addEventListener('keypress', this._handleNext, { passive: true });

            if (this._hasCustomBtns) {
                // User generated buttons get special hide class removed
                nextBtn.classList.remove('a11y-slider-hide');
            }
        });

        // Add dot navigation if enabled
        if (this.options.dots) this._generateDots();

        // Add listener for when the slider stops moving
        this.slider.addEventListener('scroll', this._handleScroll, false);

        // Add all CSS needed
        this._setCSS();

        // Adaptive height
        if (this.options.adaptiveHeight === true) {
            // Update slider's height based on content of slide
            this._updateHeight(this.activeSlide);

            // Also add resize listener for it
            window.addEventListener('resize', this._updateHeightDebounced.bind(this));
        }

        // Start autoplay if enabled
        if (this.options.autoplay) this._enableAutoplay();

        // On resize make sure to update scroll position as content may change in width/height
        window.addEventListener('resize', this._updateScrollPosition);
    }

    // Disable all functionality for the slider. Should mirror _enableSlider()
    private _disableSlider() {
        this.sliderEnabled = SliderState.Disabled;

        // Remove slider from a11y-slider's container and then remove container from DOM
        if (document.body.contains(this.sliderContainer)) {
            this.sliderContainer.insertAdjacentElement('beforebegin', this.slider);
            this.sliderContainer.parentNode && this.sliderContainer.parentNode.removeChild(this.sliderContainer);
        }

        // Remove skip button
        this._removeSkipBtn();

        // Possible for there to be multiple so need to loop through them all
        everyElement(this.options.prevBtn, prevBtn => {
            // Remove event listeners for prev/next buttons
            prevBtn.removeEventListener('click', this._handlePrev);
            prevBtn.removeEventListener('keypress', this._handlePrev);

            if (!this._hasCustomBtns) {
                // Only remove generated buttons, not user-defined ones
                prevBtn.parentNode && prevBtn.parentNode.removeChild(prevBtn);
            } else {
                // User generated buttons get special hide class removed
                prevBtn.classList.add('a11y-slider-hide');
            }
        });

        everyElement(this.options.nextBtn, nextBtn => {
            // Remove event listeners for prev/next buttons
            nextBtn.removeEventListener('click', this._handleNext);
            nextBtn.removeEventListener('keypress', this._handleNext);

            if (!this._hasCustomBtns) {
                // Only remove generated buttons, not user-defined ones
                nextBtn.parentNode && nextBtn.parentNode.removeChild(nextBtn);
            } else {
                // User generated buttons get special hide class removed
                nextBtn.classList.add('a11y-slider-hide');
            }
        });

        // Will remove dots if they exist
        this._removeDots();

        // Remove listener for when the slider stops moving
        this.slider.removeEventListener('scroll', this._handleScroll, false);

        // Remove all CSS
        this._removeCSS();

        // Remove all adaptive height functionality
        window.removeEventListener('resize', this._updateHeightDebounced);
        this._updateHeight(false);

        // Stop autoplay if enabled
        if (this.options.autoplay) this._disableAutoplay();

        // Remove scroll position update check
        window.removeEventListener('resize', this._updateScrollPosition);
    }

    // Add all CSS needed for the slider. Should mirror _removeCSS()
    private _setCSS() {
        // Update items
        this._updateItemsCSS();

        // Update slider instance to get the correct elements
        this._getActiveAndVisible();

        // Add main slider class if it doesn't have it already
        this.slider.classList.add(this._sliderClass);

        // Reset the more dynamic CSS first if it exists
        for (let slide of this.slides) {
            slide.classList.remove(this._activeClass);
            slide.classList.remove(this._visibleClass);
        }

        // Add in active classes
        this.activeSlide.classList.add(this._activeClass);

        // Add in visible classes
        for (let slide of this.visibleSlides) {
            slide.classList.add(this._visibleClass);
        }

        // Trigger dot update
        this._updateDots(this.activeSlide);

        // Update all a11y functionality
        this._addFocusable();
    }

    // Remove all CSS needed for the slider. Should mirror _setCSS()
    private _removeCSS() {
        // Remove item CSS if it was set
        this._removeItemsCSS();

        // Remove class to slider
        this.slider.classList.remove(this._sliderClass);

        // Reset all the dynamic classes
        for (let slide of this.slides) {
            slide.classList.remove(this._activeClass);
            slide.classList.remove(this._visibleClass);
        }

        // Remove all a11y functionality
        this._removeFocusable();
    }

    private _updateItemsCSS() {
        if (isInteger(this.options.slidesToShow)) {
            // Percentage width of each slide
            const slideWidth = 100 / (this.options.slidesToShow as number);

            // Set styles for slider
            this.slider.style.display = 'flex';

            // Set styles for items
            for (let slide of this.slides) {
                slide.style.width = `${slideWidth}%`;
            }
        } else {
            // Reset everything if number of items not explicitly set
            this.slider.style.removeProperty('display');

            for (let slide of this.slides) {
                slide.style.removeProperty('width');
            }
        }
    }

    // Reset item styling even if explicitly set in the options
    private _removeItemsCSS() {
        this.slider.style.removeProperty('display');

        for (let slide of this.slides) {
            slide.style.removeProperty('width');
        }
    }

    // Makes only the visible items focusable and readable by screenreaders. Should mirror _removeA11Y()
    private _addFocusable() {
        // Reset all a11y functionality to default beforehand
        this._removeFocusable();

        for (let slide of this.slides) {
            const focusableItems = slide.querySelectorAll(this._focusable);

            // If slide is not visible make the slide wrapper not focusable
            if (!slide.classList.contains(this._visibleClass)) {
                slide.setAttribute('tabindex', '-1');
                slide.setAttribute('aria-hidden', 'true');
            }

            for (let focusableItem of focusableItems) {
                if (!slide.classList.contains(this._visibleClass)) {
                    focusableItem.setAttribute('tabindex', '-1');
                }
            }
        }
    }

    // Reset a11y attributes for slide wrapper. Should mirror _addA11Y()
    private _removeFocusable() {
        for (let slide of this.slides) {
            const focusableItems = slide.querySelectorAll(this._focusable);

            // Remove a11y for each slide wrapper
            slide.removeAttribute('tabindex');
            slide.removeAttribute('aria-hidden');

            // Reset a11y attributes for slide inner elements
            for (let focusableItem of focusableItems) {
                focusableItem.removeAttribute('tabindex');
            }
        }
    }

    private _addSkipBtn() {
        const beforeEl = createElement(`<button class="a11y-slider-sr-only" type="button" tabindex="0">Click to skip slider carousel</button>`);
        const afterEl = createElement(`<div class="a11y-slider-sr-only" tabindex="-1">End of slider carousel</div>`);

        // Event handler to go to end
        const focusEnd = (event: Event) => {
            if (a11yClick(event) === true) afterEl.focus();
        }

        // Add event listeners
        beforeEl.addEventListener('click', focusEnd, { passive: true });
        beforeEl.addEventListener('keypress', focusEnd, { passive: true });

        // Add to DOM
        this.slider.insertAdjacentElement('beforebegin', beforeEl);
        this.slider.insertAdjacentElement('afterend', afterEl);
    }

    private _removeSkipBtn() {
        const skipElements = document.querySelectorAll('a11y-slider-sr-only');

        for (let skipElement of skipElements) {
            if (skipElement instanceof HTMLElement) {
                skipElement.parentNode && skipElement.parentNode.removeChild(skipElement);
            }
        }
    }

    private _generateDots() {
        this.dots = createElement(`<ul class="${this._dotsClass}"></ul>`);

        for (let i = 0; i < this._getDotCount(); i++) {
            const dotLi = createElement('<li></li>');
            const dotBtn = createElement('<button type="button"></button>');

            // Add text
            dotBtn.textContent = `Move slider to item #${i + 1}`;

            // Event handlers to switch to slide
            const switchToSlide = (event: Event) => {
                if (a11yClick(event) === true) {
                    // Go to slide
                    this.scrollToSlide(this.slides[i]);

                    // Disable autoplay if enabled
                    this._toggleAutoplay(AutoplayState.Disable);
                }
            }

            // Add event listeners
            dotBtn.addEventListener('click', switchToSlide, { passive: true });
            dotBtn.addEventListener('keypress', switchToSlide, { passive: true });

            // Append to UL
            dotLi.insertAdjacentElement('beforeend', dotBtn);
            this.dots.insertAdjacentElement('beforeend', dotLi);
        }

        // Add dots UL to DOM
        this.slider.insertAdjacentElement('afterend', this.dots);
    }

    private _getDotCount() {
        let totalSlides: number = this.slides.length;
        let slidesToShow: number = this.options.slidesToShow || this.visibleSlides.length;
        let dots: number = totalSlides - slidesToShow + 1;

        return dots;
    }

    private _removeDots() {
        if (this.dots instanceof HTMLElement) {
            this.dots.parentNode && this.dots.parentNode.removeChild(this.dots);
        }
    }

    private _updateDots(activeSlide: HTMLElement) {
        if (this.dots instanceof HTMLElement) {
            let activeIndex = Array.prototype.indexOf.call(activeSlide.parentNode && activeSlide.parentNode.children, activeSlide);

            // Set dot to last item if active index is higher than amount
            if (activeIndex > this.dots.children.length) {
                activeIndex = this.dots.children.length - 1;
            }

            // Reset children active class if exist
            for (let dot of this.dots.children) dot.querySelector('button')!.classList.remove('active');

            // Add class to active dot
            this.dots.children[activeIndex].querySelector('button')!.classList.add('active');
        }
    }

    private _enableAutoplay() {
        // Add event listeners to autoplay button to toggle
        this._autoplayBtn.addEventListener('click', this._handleAutoplay, { passive: true });
        this._autoplayBtn.addEventListener('keypress', this._handleAutoplay, { passive: true });

        // Add autoplay toggle button to DOM
        this.slider.insertAdjacentElement('beforebegin', this._autoplayBtn);

        // Start autoplaying
        this._toggleAutoplay(AutoplayState.Enable);
    }

    private _disableAutoplay() {
        // Stop autoplaying
        this._toggleAutoplay(AutoplayState.Disable);

        // Remove event listeners for toggle button
        this._autoplayBtn.removeEventListener('click', this._handleAutoplay);
        this._autoplayBtn.removeEventListener('keypress', this._handleAutoplay);

        // Remove toggle button from DOM
        this._autoplayBtn.parentNode && this._autoplayBtn.parentNode.removeChild(this._autoplayBtn);
    }

    private _toggleAutoplay(setState?: AutoplayState) {
        const startAutoplaying = () => {
            // Start autoplaying
            this._autoplayTimer = window.setInterval(() => {
                this._goPrevOrNext(SlideDirection.Next);
            }, this.options.autoplaySpeed);

            // Set autoplay button state
            this._autoplayBtn.setAttribute('data-autoplaying', 'true');
        }

        const stopAutoplaying = () => {
            // Stop autoplaying
            window.clearInterval(this._autoplayTimer);

            // Reset autoplay timer
            this._autoplayTimer = 0;

            // Set autoplay button state
            this._autoplayBtn.setAttribute('data-autoplaying', 'false');
        }

        // If state is explicitly set
        if (setState === AutoplayState.Enable) {
            startAutoplaying();
        } else if (setState === AutoplayState.Disable) {
            stopAutoplaying();
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
                    this.scrollToSlide(activeSlide && activeSlide.nextElementSibling as HTMLElement);
                }
            } else if (direction === SlideDirection.Prev) {
                // Wrap to the last slide if we're currently on the first
                if (firstVisibleSlide === firstSlide) {
                    this.scrollToSlide(lastSlide);
                } else {
                    this.scrollToSlide(activeSlide && activeSlide.previousElementSibling as HTMLElement);
                }
            }
        });
    }

    /**
     * Moves slider to target element
     */
    public scrollToSlide(targetSlide: HTMLElement) {
        const modernBrowser: boolean = !!HTMLElement.prototype.scrollTo;

        // Dispatch custom event
        this._dispatchEvent('beforeChange', {
            currentSlide: this.activeSlide,
            nextSlide: targetSlide,
            a11ySlider: this
        });

        // Update slider's height based on content of slide
        if (this.options.adaptiveHeight === true) this._updateHeight(targetSlide);

        // Move slider to specific item
        if (modernBrowser) {
            this.slider.scroll({
                left: targetSlide.offsetLeft,
                behavior: 'smooth'
            });
        } else {
            this.slider.scrollLeft = targetSlide.offsetLeft;
        }

        // Trigger dot update
        this._updateDots(targetSlide);
    }

    /**
     * Update the options on the slider instance
     */
    public updateOptions(options: Options) {
        // Assign new options
        Object.assign(this.options, options);

        // Re-run the initial enable slider option
        this._disableSlider();
        this._checkShouldEnable();
    }

    /**
     * If element is passed slider's height will match
     *  it otherwise the height of the slider is removed.
     */
    private _updateHeight(target: HTMLElement | false) {
        if (target instanceof HTMLElement) {
            const targetHeight = target.offsetHeight;
            this.slider.style.height = `${targetHeight}px`;
        } else {
            this.slider.style.height = '';
        }
    }

    public refreshHeight() {
        this._updateHeight(this.activeSlide);
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
        if (a11yClick(event) === true) {
            // Go to previous slide
            this._goPrevOrNext(SlideDirection.Prev);

            // Disable autoplay if ongoing
            this._toggleAutoplay(AutoplayState.Disable);
        }
    }

    private _handleNext(event: Event) {
        if (a11yClick(event) === true) {
            // Go to next slide
            this._goPrevOrNext(SlideDirection.Next);

            // Disable autoplay if ongoing
            this._toggleAutoplay(AutoplayState.Disable);
        }
    }

    private _handleAutoplay(event: Event) {
        if (a11yClick(event) === true) {
            if (this._autoplayTimer === 0) {
                this._toggleAutoplay(AutoplayState.Enable);
            } else {
                this._toggleAutoplay(AutoplayState.Disable);
            }
        };
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