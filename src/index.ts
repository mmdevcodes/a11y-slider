import { debounce } from 'ts-debounce';
import {
  createElement,
  a11yClick,
  crossCustomEvent,
  isInteger,
  isObject,
  everyElement,
  getSubpixelStyle
} from './utils';
import './index.css';

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

interface ActiveVisibleSlides {
  (visibleSlides: HTMLElement[], activeSlide: HTMLElement): void;
}

interface CustomPaging {
  (index: number, a11ySlider: A11YSlider): string;
}

type Options = {
  /** Adds a container element around the slider */
  container?: boolean;
  /** Enables prev/next button */
  arrows?: boolean;
  /** Button to trigger previous slide. A11YSlider will generate one by default. Can be one or multiple HTML elements */
  prevArrow?: HTMLElement | HTMLCollectionOf<HTMLElement> | NodeList;
  /** Button to trigger next slide. A11YSlider will generate one by default. Can be one or multiple HTML elements */
  nextArrow?: HTMLElement | HTMLCollectionOf<HTMLElement> | NodeList;
  /** Generate navigation dots */
  dots?: boolean;
  /** Height of slider container changes according to each slide's height */
  adaptiveHeight?: boolean;
  /** Adds a skip button before the slider for a11y devices (Can be seen by tabbing) */
  skipBtn?: boolean;
  /** The total number of items to be shown. By default A11YSlider will work by default based off your CSS styling. This option hardcodes the width into the HTML for you */
  slidesToShow?: number | null;
  /** Enables the automatic change of slides */
  autoplay?: boolean;
  /** Time between slide changes when autoplay is enabled */
  autoplaySpeed?: number;
  /** If autoplay is enabled then pause when the slider is hovered */
  autoplayHoverPause?: boolean;
  /** **(EXPERIMENTAL)** Makes the center slide active */
  centerMode?: boolean;
  /** Makes the slider infinitely loop */
  infinite?: boolean;
  /** Disables the slider */
  disable?: boolean;
  /** Define options for different viewport widths */
  responsive?: object | null;
  /** Define your own custom dots template */
  customPaging?: CustomPaging | null
};

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
  private autoplayBtn: HTMLElement;
  private _pauseOnMouseLeave: boolean;
  private _skipBtns: HTMLElement[];
  public slider: HTMLElement;
  public slides: HTMLCollectionOf<HTMLElement>;
  public dots: HTMLElement | null;
  public activeSlide: HTMLElement;
  public visibleSlides: HTMLElement[];
  public sliderContainer: HTMLElement;
  public options: Options;
  public sliderEnabled: SliderState;

  constructor(element: HTMLElement, options?: Options) {
    // Enforce `element` parameter
    if (!(element instanceof HTMLElement)) {
      throw new Error('The required input [element] must be an HTMLElement');
    }

    // Make sure options parameter is correct
    if (options !== undefined && !isObject(options)) {
      throw new Error('The required input [options] must be an Object');
    }

    this.slider = element;
    this.slides = element.children as HTMLCollectionOf<HTMLElement>;
    this.sliderContainer = createElement(
      '<div class="a11y-slider-container"></div>'
    );
    this._activeClass = 'a11y-slider-active';
    this._visibleClass = 'a11y-slider-visible';
    this._dotsClass = 'a11y-slider-dots';
    this._sliderClass = 'a11y-slider';
    this._focusable =
      'a, area, input, select, textarea, button, iframe, object, embed, *[tabindex], *[contenteditable]';
    this._autoplayTimer = IsAutoplaying.No;
    this.autoplayBtn = createElement(
      `<button type="button" class="a11y-slider-autoplay">Toggle slider autoplay</button>`
    );
    this._pauseOnMouseLeave = false;
    this._skipBtns = [];
    this.dots = null;
    this.activeSlide = this.slides[0];
    this.visibleSlides = [];
    this.sliderEnabled = SliderState.Disabled;
    this._hasCustomArrows =
      (options && options.prevArrow) || (options && options.nextArrow)
        ? true
        : false;
    this.options = {
      container: true,
      arrows: true,
      prevArrow:
        (options && options.prevArrow) ||
        createElement(
          '<button type="button" class="a11y-slider-prev">Previous slide</button>'
        ),
      nextArrow:
        (options && options.nextArrow) ||
        createElement(
          '<button type="button" class="a11y-slider-next">Next slide</button>'
        ),
      dots: true,
      adaptiveHeight: false,
      skipBtn: true,
      slidesToShow: null,
      autoplay: false,
      autoplaySpeed: 4000,
      autoplayHoverPause: true,
      centerMode: false,
      infinite: true,
      disable: false,
      responsive: null,
      customPaging: null
    };

    // Set user-inputted options if available
    this.options = { ...this.options, ...options };

    // Binding
    this._handlePrev = this._handlePrev.bind(this);
    this._handleNext = this._handleNext.bind(this);
    this._handleAutoplay = this._handleAutoplay.bind(this);
    this._handleAutoplayHover = this._handleAutoplayHover.bind(this);
    this._checkShouldEnableDebounced = debounce(
      this._checkShouldEnable.bind(this),
      250
    );
    this._updateHeightDebounced = debounce(this._updateHeight.bind(this), 250);
    this._generateDotsDebounced = debounce(this._generateDots.bind(this), 250);
    this._updateScrollPosition = debounce(
      () => this.scrollToSlide(this.activeSlide),
      250
    );
    this._handleScroll = debounce(this._handleScroll.bind(this), 10); // Calls _scrollFinish
    this._scrollFinish = debounce(this._scrollFinish.bind(this), 175); // May fire twice depending on browser

    // Initialize slider
    this._init();
  }

  // Initialize the slider, should mirror destroy()
  private _init() {
    // Firefox moves the slider depending on page load so resetting to 0
    setTimeout(() => (this.slider.scrollLeft = 0), 1);

    // Generate listeners for responsive options if added
    if (isObject(this.options.responsive)) this._checkResponsive();

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

    // If user specified to disable (usually for responsive or updateOptions)
    if (this.options.disable === true) shouldEnable = false;

    // If 1 or less slides exist then a slider is not needed
    if (this.slides.length <= 1) shouldEnable = false;

    // If user explicitly set slides to be shown and it's the same number as available
    if (isInteger(this.options.slidesToShow)) {
      if (this.slides.length === this.options.slidesToShow)
        shouldEnable = false;
    } else {
      // If there are no slides outside the slider's viewport a slider is not needed
      this._getActiveAndVisible(null, (visibleSlides: HTMLElement[]) => {
        if (visibleSlides.length === this.slides.length) shouldEnable = false;
      });
    }

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
        this.slider.insertAdjacentElement(
          'beforebegin',
          this.options.prevArrow
        );
      }

      if (this.options.nextArrow instanceof HTMLElement) {
        this.slider.insertAdjacentElement(
          'beforebegin',
          this.options.nextArrow
        );
      }
    }

    // Possible for there to be multiple so need to loop through them all
    everyElement(this.options.prevArrow, prevArrow => {
      // Add event listeners for prev/next buttons
      prevArrow.addEventListener('click', this._handlePrev, { passive: true });
      prevArrow.addEventListener('keypress', this._handlePrev, {
        passive: true
      });

      if (this._hasCustomArrows) {
        // User generated buttons get special hide class removed
        prevArrow.classList.remove('a11y-slider-hide');
      }
    });

    everyElement(this.options.nextArrow, nextArrow => {
      // Add event listeners for prev/next buttons
      nextArrow.addEventListener('click', this._handleNext, { passive: true });
      nextArrow.addEventListener('keypress', this._handleNext, {
        passive: true
      });

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
      this.sliderContainer.parentNode &&
        this.sliderContainer.parentNode.removeChild(this.sliderContainer);
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
    // Update slide element CSS
    this._addSlidesWidth();

    // Update slider instance to get the correct elements
    this._getActiveAndVisible(activeSlide || null);

    // Add main slider class if it doesn't have it already
    this.slider.classList.add(this._sliderClass);

    // Reset the more dynamic CSS first if it exists
    everyElement(this.slides, slide => {
      slide.classList.remove(this._activeClass);
      slide.classList.remove(this._visibleClass);
    });

    // Add in active classes
    this.activeSlide.classList.add(this._activeClass);

    // Add in visible classes
    everyElement(this.visibleSlides, slide => {
      slide.classList.add(this._visibleClass);
    });

    // Trigger dot update
    this._updateDots(this.activeSlide);

    // Update all a11y functionality
    this._updateA11Y();
  }

  // Remove all CSS needed for the slider. Should mirror _setCSS()
  private _removeCSS() {
    // Remove item CSS if it was set
    this._removeSlidesWidth();

    // Remove class to slider
    this.slider.classList.remove(this._sliderClass);

    // Reset all the dynamic classes
    everyElement(this.slides, slide => {
      slide.classList.remove(this._activeClass);
      slide.classList.remove(this._visibleClass);
    });

    // Remove all a11y functionality
    this._removeA11Y();
  }

  // Add event listeners for breakpoints
  private _checkResponsive() {
    if (!isObject(this.options.responsive)) return;

    const { responsive, ...initialOptions } = this.options;
    const breakpoints: Array<{ mql: MediaQueryList; options: Options }> = [];

    // Sort media queries from lowest to highest
    const responsiveOptions = Object.entries(
      this.options.responsive as object
    ).sort((a, b) => a[1] - b[1]);

    // Create a new JS media query for initial options for the lowest MQ and down
    breakpoints.push({
      mql: window.matchMedia(
        `screen and (max-width: ${Number.parseInt(responsiveOptions[0][0]) -
          1}px)`
      ),
      options: initialOptions as Options
    });

    // Loop through all responsive objects and generate a JS media query
    responsiveOptions.forEach(
      ([breakpoint, breakpointOptions]: [string, Options], i) => {
        let options: Options = { ...this.options };
        let mqlString = `screen and (min-width: ${breakpoint}px)`;

        // If there are more media queries after this then create a stopping point
        if (i !== responsiveOptions.length - 1) {
          mqlString = mqlString.concat(
            ` and (max-width: ${Number.parseInt(responsiveOptions[i + 1][0]) -
              1}px)`
          );
        }

        // Create a layer cake of options from the lowest breakpoint to the highest
        breakpoints.forEach(breakpoint => {
          Object.assign(options, breakpoint.options);
        });

        // Add this specific breakpoint to the top of the cake 🎂
        Object.assign(options, breakpointOptions);

        breakpoints.push({
          mql: window.matchMedia(mqlString),
          options
        });
      }
    );

    // For each JS media query add an event listener
    breakpoints.map(breakpoint => {
      /**
       * This should in theory be running at the initialization
       * so make sure the correct options are set.
       */
      if (breakpoint.mql.matches) {
        Object.assign(this.options, breakpoint.options);
      }

      // Creates a media query listener
      breakpoint.mql.addListener(() => {
        if (breakpoint.mql.matches) {
          // Update slider with new options
          this.updateOptions(breakpoint.options);
        }
      });
    });
  }

  // If slidesToShow is used then manually add slide widths
  private _addSlidesWidth() {
    if (isInteger(this.options.slidesToShow)) {
      // Percentage width of each slide
      const slideWidth = 100 / (this.options.slidesToShow as number);

      // Set styles for slider
      this.slider.style.display = 'flex';

      // Set styles for items
      everyElement(this.slides, slide => {
        slide.style.width = `${slideWidth}%`;
        slide.style.flex = '0 0 auto';
      });
    } else {
      // Reset everything if number of items not explicitly set
      this._removeSlidesWidth();
    }
  }

  // Reset slide styling even if explicitly set in the options
  private _removeSlidesWidth() {
    this.slider.style.removeProperty('display');

    everyElement(this.slides, slide => {
      slide.style.removeProperty('width');
      slide.style.removeProperty('flex');
    });
  }

  // Update all associated a11y functionality. Should mirror _removeA11Y()
  private _updateA11Y() {
    // Reset all a11y functionality to default beforehand
    this._removeA11Y();

    everyElement(this.slides, slide => {
      const focusableItems = slide.querySelectorAll(this._focusable);

      // If slide is not visible make the slide wrapper not focusable
      if (!slide.classList.contains(this._visibleClass)) {
        slide.setAttribute('tabindex', '-1');
        slide.setAttribute('aria-hidden', 'true');
      }

      everyElement(focusableItems, focusableItem => {
        if (!slide.classList.contains(this._visibleClass)) {
          focusableItem.setAttribute('tabindex', '-1');
        }
      });
    });

    // Buttons will add disabled state if first/last slide
    if (this.options.infinite === false) {
      const firstSlide = this.slider.firstElementChild as HTMLElement;
      const lastSlide = this.slider.lastElementChild as HTMLElement;
      const firstVisibleSlide = this.visibleSlides[0];
      const lastVisibleSlide = this.visibleSlides[
        this.visibleSlides.length - 1
      ];

      // If current active slide is the first element then disable prev
      if (firstVisibleSlide === firstSlide) {
        everyElement(this.options.prevArrow, prevArrow => {
          prevArrow.setAttribute('disabled', '');
        });
      }

      // If current active slide is the last element then disable next
      if (lastVisibleSlide === lastSlide) {
        everyElement(this.options.nextArrow, nextArrow => {
          nextArrow.setAttribute('disabled', '');
        });
      }
    }
  }

  // Reset all associated a11y functionality. Should mirror _updateA11Y()
  private _removeA11Y() {
    everyElement(this.slides, slide => {
      const focusableItems = slide.querySelectorAll(this._focusable);

      // Remove a11y for each slide wrapper
      slide.removeAttribute('tabindex');
      slide.removeAttribute('aria-hidden');

      // Reset a11y attributes for slide inner elements
      everyElement(focusableItems, focusableItem => {
        focusableItem.removeAttribute('tabindex');
      });
    });

    // Buttons could potentially have disabled state so removing
    everyElement(this.options.prevArrow, prevArrow =>
      prevArrow.removeAttribute('disabled')
    );
    everyElement(this.options.nextArrow, nextArrow =>
      nextArrow.removeAttribute('disabled')
    );
  }

  private _addSkipBtn() {
    const beforeEl = createElement(
      `<button class="a11y-slider-sr-only" type="button" tabindex="0">Click to skip slider carousel</button>`
    );
    const afterEl = createElement(
      `<div class="a11y-slider-sr-only" tabindex="-1">End of slider carousel</div>`
    );

    // Event handler to go to end
    const focusEnd = (event: Event) => {
      if (a11yClick(event) === true) afterEl.focus();
    };

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
    if (this.options.dots === false) return;

    // Remove dots if they already exist
    this._removeDots();

    // Stop if slider is disabled
    if (this.sliderEnabled === SliderState.Disabled) return;

    // Create <ul> wrapper for dots
    this.dots = createElement(`<ul class="${this._dotsClass}"></ul>`);

    for (let i = 0; i < this._getDotCount(); i++) {
      const dotLi = createElement('<li></li>');
      let dotBtn: HTMLElement;

      if (this.options.customPaging) {
        dotBtn = createElement(this.options.customPaging(i, this));
      } else {
        dotBtn = createElement('<button type="button"></button>');
        dotBtn.textContent = `Move slider to item #${i + 1}`;
      }

      // Event handlers to switch to slide
      const switchToSlide = (event: Event) => {
        if (a11yClick(event) === true) {
          // Go to slide
          this.scrollToSlide(this.slides[i]);

          // Disable autoplay if enabled
          this._toggleAutoplay(AutoplaySwitch.Disable);
        }
      };

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
    let slidesToShow: number =
      this.options.slidesToShow || this.visibleSlides.length;
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
      let activeIndex = Array.prototype.indexOf.call(
        activeSlide.parentNode && activeSlide.parentNode.children,
        activeSlide
      );

      // Set dot to last item if active index is higher than amount
      if (activeIndex > this.dots.children.length) {
        activeIndex = this.dots.children.length - 1;
      }

      // Reset children active class if exist
      everyElement(this.dots.children, dot =>
        dot.querySelector('button')?.classList.remove('active')
      );

      // Add class to active dot
      this.dots.children[activeIndex]
        .querySelector('button')
        ?.classList.add('active');
    }
  }

  private _enableAutoplay() {
    // Add event listeners for autoplay
    this.autoplayBtn.addEventListener('click', this._handleAutoplay, {
      passive: true
    });
    this.autoplayBtn.addEventListener('keypress', this._handleAutoplay, {
      passive: true
    });

    if (this.options.autoplayHoverPause) {
      this.slider.addEventListener('mouseenter', this._handleAutoplayHover, {
        passive: true
      });
      this.slider.addEventListener('mouseleave', this._handleAutoplayHover, {
        passive: true
      });
    }

    // Add autoplay toggle button to DOM
    this.slider.insertAdjacentElement('beforebegin', this.autoplayBtn);

    // Start autoplaying
    this._toggleAutoplay(AutoplaySwitch.Enable);
  }

  private _disableAutoplay() {
    // Stop autoplaying
    this._toggleAutoplay(AutoplaySwitch.Disable);

    // Remove event listeners for autoplay
    this.autoplayBtn.removeEventListener('click', this._handleAutoplay);
    this.autoplayBtn.removeEventListener('keypress', this._handleAutoplay);
    this.slider.removeEventListener('mouseenter', this._handleAutoplayHover);
    this.slider.removeEventListener('mouseleave', this._handleAutoplayHover);

    // Remove toggle button from DOM
      this.autoplayBtn.parentNode?.removeChild(this.autoplayBtn);
  }

  private _toggleAutoplay(setState: AutoplaySwitch) {
    const startAutoplaying = () => {
      // Start autoplaying
      this._autoplayTimer = window.setInterval(() => {
        this._goPrevOrNext(SlideDirection.Next);
      }, this.options.autoplaySpeed);

      // Set autoplay button state
      this.autoplayBtn.setAttribute('data-autoplaying', 'true');
    };

    const stopAutoplaying = () => {
      // Stop autoplaying
      window.clearInterval(this._autoplayTimer);

      // Reset autoplay timer
      this._autoplayTimer = IsAutoplaying.No;

      // Set autoplay button state
      this.autoplayBtn.setAttribute('data-autoplaying', 'false');
    };

    if (setState === AutoplaySwitch.Enable) {
      startAutoplaying();
    } else if (setState === AutoplaySwitch.Disable) {
      stopAutoplaying();
    }
  }

  private _goPrevOrNext(direction: SlideDirection) {
    this._getActiveAndVisible(
      null,
      (visibleSlides: HTMLElement[], activeSlide: HTMLElement) => {
        const firstSlide = this.slider.firstElementChild as HTMLElement;
        const lastSlide = this.slider.lastElementChild as HTMLElement;
        const firstVisibleSlide = visibleSlides[0];
        const lastVisibleSlide = visibleSlides[visibleSlides.length - 1];

        if (direction === SlideDirection.Next) {
          // Wrap to the first slide if we're currently on the last
          if (lastVisibleSlide === lastSlide) {
            this.options.infinite === true && this.scrollToSlide(firstSlide);
          } else {
            this.scrollToSlide(
              activeSlide && (activeSlide.nextElementSibling as HTMLElement)
            );
          }
        } else if (direction === SlideDirection.Prev) {
          // Wrap to the last slide if we're currently on the first
          if (firstVisibleSlide === firstSlide) {
            this.options.infinite === true && this.scrollToSlide(lastSlide);
          } else {
            this.scrollToSlide(
              activeSlide && (activeSlide.previousElementSibling as HTMLElement)
            );
          }
        }
      }
    );
  }

  /**
   * Moves slider to target element
   */
  public scrollToSlide(target: HTMLElement | number) {
    const modernBrowser: boolean = !!HTMLElement.prototype.scrollTo;
    const originalPosition = this.slider.scrollLeft;
    let targetSlide: HTMLElement;

    if (isInteger(target)) {
      targetSlide = this.slides[target as number];
    } else if (target instanceof HTMLElement) {
      targetSlide = target;
    } else {
      throw new Error('scrollToSlide only accepts an HTMLElement or number');
    }

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

  /** Manully update height of slider (based off adaptiveHeight option) */
  public refreshHeight() {
    this._updateHeight(this.activeSlide);
  }

  private _getActiveAndVisible(
    explicitActive: HTMLElement | null,
    callback?: ActiveVisibleSlides
  ) {
    /**
     * Parent element needs the correct styling for
     * calculations so backing up the initial styles
     */
    const noSliderClass = !this.slider.classList.contains(this._sliderClass);
    const borderStyle = this.slider.style.borderWidth;

    // Applying correct styles for calculations
    this.slider.style.borderWidth = '0px';
    if (noSliderClass) this.slider.classList.add(this._sliderClass);

    // Can start storing variables now for calculations
    const visibleSlides: HTMLElement[] = [];
    // better cross browser support by getting subpixels then rounding
    const sliderWidth = Math.round(this.slider.getBoundingClientRect().width);
    // Add a 1 pixel buffer so that subpixels are more consistent cross-browser
    const sliderPosition =
      this.slider.scrollLeft - 1 < 0 ? 0 : this.slider.scrollLeft - 1;

    // Only detects items in the visible viewport of the parent element
    everyElement(this.slides, slide => {
      const slideOffset = slide.offsetLeft;

      if (
        slideOffset >= sliderPosition &&
        slideOffset < sliderPosition + sliderWidth
      ) {
        visibleSlides.push(slide);
      }
    });

    // Add back the original styles
    this.slider.style.borderWidth = borderStyle;
    if (noSliderClass) this.slider.classList.remove(this._sliderClass);

    // Globally set visible slides
    this.visibleSlides = visibleSlides;

    if (explicitActive) {
      this.activeSlide = explicitActive;
    } else if (this.options.centerMode === true) {
      this.activeSlide = this.visibleSlides[
        Math.floor((this.visibleSlides.length - 1) / 2)
      ];
    } else {
      this.activeSlide = visibleSlides[0] ?? this.slides[0];
    }

    callback && callback(this.visibleSlides, this.activeSlide);
  }

  private _handlePrev(event: Event) {
    if (a11yClick(event) === true) {
      // Go to previous slide
      this._goPrevOrNext(SlideDirection.Prev);

      // Disable autoplay if ongoing
      this._toggleAutoplay(AutoplaySwitch.Disable);
    }
  }

  private _handleNext(event: Event) {
    if (a11yClick(event) === true) {
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
    }
  }

  private _handleAutoplayHover(event: MouseEvent) {
    if (event.type === 'mouseenter') {
      if (this._autoplayTimer !== IsAutoplaying.No) {
        this._toggleAutoplay(AutoplaySwitch.Disable);
        this._pauseOnMouseLeave = true;
      }
    } else if (event.type === 'mouseleave' && this._pauseOnMouseLeave) {
      if (this._autoplayTimer === IsAutoplaying.No) {
        this._toggleAutoplay(AutoplaySwitch.Enable);
        this._pauseOnMouseLeave = false;
      }
    }
  }

  private _handleScroll() {
    // This is a debounced function. Will fire once done scrolling
    this._scrollFinish();
  }

  private _scrollFinish() {
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
    // TODO: Removal of responsive event listeners should go here

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
