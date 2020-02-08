import { debounce } from 'ts-debounce';
import {
    createElement,
    a11yClick,
    crossCustomEvent,
    isInteger,
    everyElement,
    getSubpixelStyle
} from './utils';
import './index.css';

interface Options {
    container: boolean,
    arrows: boolean,
    prevArrow: HTMLElement | HTMLCollectionOf<HTMLElement> | NodeList,
    nextArrow: HTMLElement | HTMLCollectionOf<HTMLElement> | NodeList,
    dots: boolean,
    adaptiveHeight: boolean,
    skipBtn: boolean,
    slidesToShow: number | false,
    autoplay: boolean,
    autoplaySpeed: number,
    autoplayHoverPause: boolean,
    centerMode: boolean
}

interface ActiveVisibleSlides {
    (visibleSlides: HTMLElement[], activeSlide: HTMLElement): void;
}

enum SlideDirection {
    Prev,
    Next
}

enum SliderState {
    Enabled = 1,
    Disabled = 0
}

enum AutoplaySwitch {
    Enable,
    Disable
}

enum IsAutoplaying {
    Yes,
    No = 0
}

export default class A11YSlider {
    private _activeClass: string;
    private _visibleClass: string;
    private _dotsClass: string;
    private _sliderClass: string;
    private _hasCustomArrows: boolean;
    private _focusable: string;
    private _checkShouldEnableDebounced: any;
    private _updateHeightDebounced: any;
    private _generateDotsDebounced: any;
    private _updateScrollPosition: any;
    private _autoplayTimer: IsAutoplaying;
    private _autoplayBtn: HTMLElement;
    private _pauseOnMouseLeave: boolean;
    private _skipBtns: HTMLElement[];
    private _isScrolling: boolean;
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
        this._autoplayTimer = IsAutoplaying.No;
        this._autoplayBtn = createElement(`<button type="button" class="a11y-slider-autoplay">Toggle slider autoplay</button>`);
        this._pauseOnMouseLeave = false;
        this._skipBtns = [];
        this._isScrolling = false;
        this.dots = null;
        this.activeSlide = this.slides[0];
        this.visibleSlides = [];
        this.sliderEnabled = SliderState.Disabled;
        this._hasCustomArrows = options && options.prevArrow || options && options.nextArrow ? true : false;
        this.options = {
            container: true,
            arrows: true,
            prevArrow: options && options.prevArrow || createElement('<button type="button" class="a11y-slider-prev">Previous slide</button>'),
            nextArrow: options && options.nextArrow || createElement('<button type="button" class="a11y-slider-next">Next slide</button>'),
            dots: true,
            adaptiveHeight: false,
            skipBtn: true,
            slidesToShow: false,
            autoplay: false,
            autoplaySpeed: 4000,
            autoplayHoverPause: true,
            centerMode: false
        };

        // Set user-inputted options if available
        Object.assign(this.options, options);

        // Binding
        this._handlePrev = this._handlePrev.bind(this);
        this._handleNext = this._handleNext.bind(this);
        this._handleAutoplay = this._handleAutoplay.bind(this);
        this._handleAutoplayHover = this._handleAutoplayHover.bind(this);
        this._checkShouldEnableDebounced = debounce(this._checkShouldEnable.bind(this), 250);
        this._updateHeightDebounced = debounce(this._updateHeight.bind(this), 250);
        this._generateDotsDebounced = debounce(this._generateDots.bind(this), 250);
        this._updateScrollPosition = debounce(() => this.scrollToSlide(this.activeSlide), 250);
        this._handleScroll = debounce(this._handleScroll.bind(this), 10); // Calls _scrollFinish
        this._scrollFinish = debounce(this._scrollFinish.bind(this), 175); // May fire twice depending on browser

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
        this._getActiveAndVisible(null, (visibleSlides: HTMLElement[]) => {
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
        if (!shouldEnable && this._hasCustomArrows) {
            everyElement(this.options.prevArrow, prevArrow => {
                prevArrow.classList.add('a11y-slider-hide');
            });

            everyElement(this.options.nextArrow, nextArrow => {
                nextArrow.classList.add('a11y-slider-hide');
            });
        }
    }

     // Enable all functionality for the slider. Should mirror _disableSlider()
    private _enableSlider() {
        // Set slider to enabled
        this.sliderEnabled = SliderState.Enabled;

        // Firefox moves the slider depending on page load so resetting to 0
        setTimeout(() => this.slider.scrollLeft = 0, 1);

        // Add slider container to DOM and move slider into it if enabled
        if (this.options.container) {
            this.slider.insertAdjacentElement('beforebegin', this.sliderContainer);
            this.sliderContainer.insertAdjacentElement('afterbegin', this.slider);
        }

        // Add skip button before slider if enabled
        if (this.options.skipBtn) this._addSkipBtn();

        // If prev/next buttons are enabled and user isn't using their own add it to the DOM
        if (this.options.arrows && !this._hasCustomArrows) {
            if (this.options.prevArrow instanceof HTMLElement) {
                this.slider.insertAdjacentElement('beforebegin', this.options.prevArrow);
            }

            if (this.options.nextArrow instanceof HTMLElement) {
                this.slider.insertAdjacentElement('beforebegin', this.options.nextArrow);
            }
        }

        // Possible for there to be multiple so need to loop through them all
        everyElement(this.options.prevArrow, prevArrow => {
            // Add event listeners for prev/next buttons
            prevArrow.addEventListener('click', this._handlePrev, { passive: true });
            prevArrow.addEventListener('keypress', this._handlePrev, { passive: true });

            if (this._hasCustomArrows) {
                // User generated buttons get special hide class removed
                prevArrow.classList.remove('a11y-slider-hide');
            }
        });

        everyElement(this.options.nextArrow, nextArrow => {
            // Add event listeners for prev/next buttons
            nextArrow.addEventListener('click', this._handleNext, { passive: true });
            nextArrow.addEventListener('keypress', this._handleNext, { passive: true });

            if (this._hasCustomArrows) {
                // User generated buttons get special hide class removed
                nextArrow.classList.remove('a11y-slider-hide');
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
        everyElement(this.options.prevArrow, prevArrow => {
            // Remove event listeners for prev/next buttons
            prevArrow.removeEventListener('click', this._handlePrev);
            prevArrow.removeEventListener('keypress', this._handlePrev);

            if (!this._hasCustomArrows) {
                // Only remove generated buttons, not user-defined ones
                prevArrow.parentNode && prevArrow.parentNode.removeChild(prevArrow);
            } else {
                // User generated buttons get special hide class removed
                prevArrow.classList.add('a11y-slider-hide');
            }
        });

        everyElement(this.options.nextArrow, nextArrow => {
            // Remove event listeners for prev/next buttons
            nextArrow.removeEventListener('click', this._handleNext);
            nextArrow.removeEventListener('keypress', this._handleNext);

            if (!this._hasCustomArrows) {
                // Only remove generated buttons, not user-defined ones
                nextArrow.parentNode && nextArrow.parentNode.removeChild(nextArrow);
            } else {
                // User generated buttons get special hide class removed
                nextArrow.classList.add('a11y-slider-hide');
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
    private _setCSS(activeSlide?: HTMLElement) {
        // Update items
        this._updateItemsCSS();

        // Update slider instance to get the correct elements
        this._getActiveAndVisible(activeSlide || null);

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

        // If skip buttons exist for whatever reason, empty array
        this._skipBtns = [];

        // Add newly created buttons to library scope
        this._skipBtns.push(beforeEl, afterEl);
    }

    private _removeSkipBtn() {
        everyElement(this._skipBtns, skipBtn => {
            skipBtn.parentNode && skipBtn.parentNode.removeChild(skipBtn);
        });
    }

    private _generateDots() {
        // Remove dots if they already exist
        this._removeDots();

        // Stop if slider is disabled
        if (this.sliderEnabled === SliderState.Disabled) return;

        // Create <ul> wrapper for dots
        this.dots = createElement(`<ul class="${this._dotsClass}"></ul>`);

        for (let i = 0; i < this._getDotCount(); i++) {
            const dotLi = createElement('<li></li>');
            const dotBtn = createElement('<button type="button"></button>');

            // Add text
            dotBtn.textContent = `Move slider to item #${i + 1}`;

            // Event handlers to switch to slide
            const switchToSlide = (event: Event) => {
                if (a11yClick(event) === true && this._isScrolling === false) {
                    // Go to slide
                    this.scrollToSlide(this.slides[i]);

                    // Disable autoplay if enabled
                    this._toggleAutoplay(AutoplaySwitch.Disable);
                }
            }

            // Add event listeners
            dotBtn.addEventListener('click', switchToSlide, { passive: true });
            dotBtn.addEventListener('keypress', switchToSlide, { passive: true });

            // Append to UL
            dotLi.insertAdjacentElement('beforeend', dotBtn);
            this.dots.insertAdjacentElement('beforeend', dotLi);
        }

        // Update styles of dots before adding to DOM
        this._updateDots(this.activeSlide);

        // Add dots UL to DOM
        this.slider.insertAdjacentElement('afterend', this.dots);

        // Dots needed may change on screen size so regenerate them from scratch
        window.addEventListener('resize', this._generateDotsDebounced);
    }

    private _getDotCount() {
        let totalSlides: number = this.slides.length;
        let slidesToShow: number = this.options.slidesToShow || this.visibleSlides.length;
        let dots: number = totalSlides - slidesToShow + 1;

        return dots;
    }

    private _removeDots() {
        window.removeEventListener('resize', this._generateDotsDebounced);

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
        // Add event listeners for autoplay
        this._autoplayBtn.addEventListener('click', this._handleAutoplay, { passive: true });
        this._autoplayBtn.addEventListener('keypress', this._handleAutoplay, { passive: true });

        if (this.options.autoplayHoverPause) {
            this.slider.addEventListener('mouseenter', this._handleAutoplayHover, { passive: true });
            this.slider.addEventListener('mouseleave', this._handleAutoplayHover, { passive: true });
        }

        // Add autoplay toggle button to DOM
        this.slider.insertAdjacentElement('beforebegin', this._autoplayBtn);

        // Start autoplaying
        this._toggleAutoplay(AutoplaySwitch.Enable);
    }

    private _disableAutoplay() {
        // Stop autoplaying
        this._toggleAutoplay(AutoplaySwitch.Disable);

        // Remove event listeners for autoplay
        this._autoplayBtn.removeEventListener('click', this._handleAutoplay);
        this._autoplayBtn.removeEventListener('keypress', this._handleAutoplay);
        this.slider.removeEventListener('mouseenter', this._handleAutoplayHover);
        this.slider.removeEventListener('mouseleave', this._handleAutoplayHover);

        // Remove toggle button from DOM
        this._autoplayBtn.parentNode && this._autoplayBtn.parentNode.removeChild(this._autoplayBtn);
    }

    private _toggleAutoplay(setState: AutoplaySwitch) {
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
            this._autoplayTimer = IsAutoplaying.No;

            // Set autoplay button state
            this._autoplayBtn.setAttribute('data-autoplaying', 'false');
        }

        if (setState === AutoplaySwitch.Enable) {
            startAutoplaying();
        } else if (setState === AutoplaySwitch.Disable) {
            stopAutoplaying();
        }
    }

    private _goPrevOrNext(direction: SlideDirection) {
        this._getActiveAndVisible(null, (visibleSlides: HTMLElement[], activeSlide: HTMLElement) => {
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
        const originalPosition = this.slider.scrollLeft;

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

        // If the slider didn't move make sure to update the slider still
        setTimeout(() => {
            if (
                this.slider.scrollLeft === originalPosition &&
                this.sliderEnabled === SliderState.Enabled
            ) {
                this._setCSS(targetSlide);
            }
        }, 50);

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
            const targetHeight = getSubpixelStyle(target, 'height');
            this.slider.style.height = `${targetHeight}px`;
        } else {
            this.slider.style.height = '';
        }
    }

    public refreshHeight() {
        this._updateHeight(this.activeSlide);
    }

    private _getActiveAndVisible(explicitActive: HTMLElement | null, callback?: ActiveVisibleSlides) {
        let visibleSlides: HTMLElement[] = [];
        // better cross browser support by getting subpixels then rounding
        const sliderWidth = Math.round(this.slider.getBoundingClientRect().width);
        // Add a 1 pixel buffer so that subpixels are more consistent cross-browser
        const sliderPosition = this.slider.scrollLeft - 1 < 0 ? 0 : this.slider.scrollLeft - 1;

        // Only detects items in the visible viewport of the parent element
        for (let slide of this.slides) {
            const slideOffset = slide.offsetLeft;

            if (slideOffset >= sliderPosition && slideOffset < (sliderPosition + sliderWidth)) {
                visibleSlides.push(slide);
            }
        }

        this.visibleSlides = visibleSlides;

        if (explicitActive) {
            this.activeSlide = explicitActive;
        } else if (this.options.centerMode === true) {
            this.activeSlide = this.visibleSlides[Math.floor((this.visibleSlides.length - 1) / 2)];
        } else {
            this.activeSlide = visibleSlides[0];
        }

        callback && callback(this.visibleSlides, this.activeSlide);
    }

    private _handlePrev(event: Event) {
        if (a11yClick(event) === true && this._isScrolling === false) {
            // Go to previous slide
            this._goPrevOrNext(SlideDirection.Prev);

            // Disable autoplay if ongoing
            this._toggleAutoplay(AutoplaySwitch.Disable);
        }
    }

    private _handleNext(event: Event) {
        if (a11yClick(event) === true && this._isScrolling === false) {
            // Go to next slide
            this._goPrevOrNext(SlideDirection.Next);

            // Disable autoplay if ongoing
            this._toggleAutoplay(AutoplaySwitch.Disable);
        }
    }

    private _handleAutoplay(event: Event) {
        if (a11yClick(event) === true) {
            if (this._autoplayTimer === IsAutoplaying.No) {
                this._toggleAutoplay(AutoplaySwitch.Enable);
            } else {
                this._toggleAutoplay(AutoplaySwitch.Disable);
            }
        };
    }

    private _handleAutoplayHover(event: MouseEvent) {
        if (event.type === "mouseenter") {
            if (this._autoplayTimer !== IsAutoplaying.No) {
                this._toggleAutoplay(AutoplaySwitch.Disable);
                this._pauseOnMouseLeave = true;
            }
        } else if (event.type === "mouseleave" && this._pauseOnMouseLeave) {
            if (this._autoplayTimer === IsAutoplaying.No) {
                this._toggleAutoplay(AutoplaySwitch.Enable);
                this._pauseOnMouseLeave = false;
            }
        }
    }

    private _handleScroll() {
        // Globally set the slider as scrolling
        this._isScrolling = true;

        // This is a debounced function. Will fire once done scrolling
        this._scrollFinish();
    }

    private _scrollFinish() {
        // Globally set the slider as not scrolling
        this._isScrolling = false;

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