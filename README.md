# A11Y Slider

Library for simple and accessible sliders. [Demo and examples](https://a11yslider.js.org/#examples)

## Install

Using npm:

```bash
npm install a11y-slider
```

Using browser:

```html
<!-- In the <head> -->
<link rel="stylesheet" href="//unpkg.com/a11y-slider@latest/dist/a11y-slider.css" />

<!-- End of <body> -->
<script src="//unpkg.com/a11y-slider@latest/dist/a11y-slider.js"></script>
```

## Usage

A11YSlider works by using [CSS scroll snapping](https://css-tricks.com/practical-css-scroll-snapping/). You can generate a slider by creating an overflowed container and then setting widths all via CSS. Media queries in your CSS will also update the slider.

```html
<style>
  .slider {
    display: flex;
  }

  .slider > * {
    width: 100%;
    flex: 0 0 auto;
  }
</style>

<ul class="slider">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
</ul>

<script>
  const slider = new A11YSlider(document.querySelector('.slider'), {
    adaptiveHeight: true,
    dots: false
  });
</script>
```
`A11YSlider(element, options)`

The `element` is the targeted slider element. The `options` is an optional parameter. See [options](#options) for more info.

**Note:** A11YSlider only runs if needed! If A11YSlider detects that all slides are already visible in the container then it will not run.

## Options

| Option              | Type             | Description                                                                                                                                                                               |
| ------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| container           | Boolean          | Default: `true` <br>Adds a container element around the slider                                                                                                                            |
| arrows              | Boolean          | Default: `true` <br>Enables prev/next button                                                                                                                                              |
| prevArrow           | Node \| NodeList | Default: `<button>` <br>Button to trigger previous slide. A11YSlider will generate one by default. Can be one or multiple HTML elements.                                                     |
| nextArrow           | Node \| NodeList | Default: `<button>` <br>Button to trigger next slide. A11YSlider will generate one by default. Can be one or multiple HTML elements.                                                         |
| dots                | Boolean          | Default: `true` <br>Generate navigation dots                                                                                                                                              |
| adaptiveHeight      | Boolean          | Default: `false` <br>Height of slider container changes according to each slide's height                                                                                                  |
| skipBtn             | Boolean          | Default: `true` <br>Adds a skip button before the slider for a11y devices (Can be seen by tabbing)                                                                                        |
| slidesToShow        | Number \| Null   | Default: `null` <br>The total number of items to be shown. By default A11YSlider will work by default based off your CSS styling. This option hardcodes the width into the HTML for you.  |
| autoplay            | Boolean          | Default: `false` <br>Enables the automatic change of slides                                                                                                                               |
| autoplaySpeed       | Number           | Default: `4000` <br>Time between slide changes when autoplay is enabled (milliseconds)                                                                                                    |
| autoplayHoverPause  | Boolean          | Default: `true` <br>If autoplay is enabled then pause when the slider is hovered                                                                                                          |
| centerMode          | Boolean          | Default: `false` <br>**(EXPERIMENTAL)** Makes the center slide active                                                                                                                    |
| infinite            | Boolean          | Default: `true` <br>Makes the slider infinitely loop                                                                                                                                      |
| disable             | Boolean          | Default: `false` <br>Disables the slider                                                                                                                                                  |
| responsive          | Object \| Null   | Default: `null` <br>Define options for different viewport widths. See [responsive example](#responsive-option-example)                                                                    |
| customPaging        | Function \| Null | Default: `null` <br>Define your own custom dots template                                                                    |
| swipe               | Boolean          | Default: `true` <br>Enable swiping                                                                                          |

### Responsive Option Example

You can have different options per specified viewport width. This behaves like CSS min-width media queries. Your initial options outside of the `responsive` object will work from your lowest specified viewport and down.

```js
const slider = new A11YSlider(document.querySelector('.slider'), {
  slidesToShow: 1,
  arrows: true, // arrows enabled 767px and down
  dots: false,
  responsive: {
    768: {
      slidesToShow: 2,
      arrows: false
    },
    960: {
      disable: true // slider disabled 960px to 1279px
    },
    1280: {
      disable: false,
      slidesToShow: 4,
      dots: true // dots enabled 1280px and up
    }
  }
});
```

### Custom Paging Example

If you would like your own custom HTML for each dot you can pass in your own function. It must return a string and then this function will be called to create HTML for each individual dot. Note that dots will still be wrapped in a `<ul>`.

```js
const slider = new A11YSlider(document.querySelector('.slider'), {
  dots: true,
  customPaging: function(index, a11ySlider) {
      return '<button class="mycustombtn">' + index + '</button>';
  }
});
```

Will output to:

```html
<ul class="a11y-slider-dots">
  <li><button class="mycustombtn">0</button></li>
  <li><button class="mycustombtn">1</button></li>
  <li><button class="mycustombtn">2</button></li>
  <li><button class="mycustombtn">3</button></li>
</ul>
```

## Methods

```js
// Example use of the 'scrollToSlide' method.
// Scrolls to the 3rd slide (0-based index)
slider.scrollToSlide(2);
```

| Method        | Arguments                           | Description                                               |
| ------------- | ----------------------------------- | --------------------------------------------------------- |
| scrollToSlide | Number \| Element                   | Scrolls slider to specified slide index (0-based) or slide element |
| updateOptions | Object                              | Enter new set of options (reloads slider)                 |
| refreshHeight |                                   | Sets height of slider to height of the current active slide |
| destroy       |                                     | Removes everything that the A11YSlider created in the DOM |

## Events

```js
// Example use of the 'afterChange' event
const sliderEl = document.querySelector('.slider');

sliderEl.addEventListener('afterChange', function(e) {
  console.log(e.detail.currentSlide);
});

const slider = new A11YSlider(sliderEl, {
    infinite: true
});
```

| Event         | Detail                              | Description                         |
| ------------- | ----------------------------------- | ----------------------------------- |
| init          | a11yslider                          | Fires after slider initialization   |
| beforeChange  | currentSlide, nextSlide, a11yslider | Fires before slide change           |
| afterChange   | currentSlide, a11yslider            | Fires after slide change            |
| autoplayStart | currentSlide, a11yslider            | Fires when autoplay starts          |
| autoplayStop  | currentSlide, a11yslider            | Fires when autoplay stops           |
| destroy       | a11yslider                          | Fires after the slider is destroyed |

Events listeners should be added before initializing the slider if possible. For example `init` will require it.

## Browser support

A11YSlider works on all modern browsers including IE11. See notes for some caveats.

## Notes

- Non-modern browsers that doesn't support [ScrollToOptions](https://developer.mozilla.org/en-US/docs/Web/API/ScrollToOptions) will not have smooth scrolling when switching slides. A polyfill like [smoothscroll](https://github.com/iamdustan/smoothscroll) can be used to fix this.

#### Todo

- Examples
- Look into not removing width style from slides
- Make autoprefix run automatically
- Better resize throttling
- Look into enabling useCapture for scroll events to prevent window events