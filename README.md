# A11Y Slider

Library for accessible sliders. This is a very early version and the API can possibly change at any time.

## Install

Install via npm:

```bash
npm install a11y-slider
```

Install via browser:

<!-- prettier-ignore -->
```html
<!-- In the <head> -->
<link rel="stylesheet" href="//unpkg.com/a11y-slider@latest/dist/a11y-slider.css" />

<!-- End of <body> -->
<script src="//unpkg.com/a11y-slider@latest/dist/a11y-slider.js"></script>
```

The CSS is small enough to copy directly into your project's main stylesheet if you desire.

## Usage

`A11YSlider(element, options)`

```js
import A11ySlider from 'a11y-slider';

// options parameter is optional
const slider = new A11YSlider(document.querySelector('.slider'), options);
```

The `element` is the targeted slider.

The `options` is an optional parameter. Takes an object. See [options](#options) for more info.

## Options

The default `options` are:

```js
{
  navBtns: true,
  prevBtn: HTMLElement,
  nextBtn: HTMLElement,
  dots: true
}
```

`prevBtn` and `nextBtn` can one or more HTML elements. For example via querySelector or querySelectorAll. If not supplied it will generate buttons if `navBtns` is true.

## Methods

```js
// Example use of the 'scrollToSlide' method
slider.scrollToSlide(document.querySelector('.slider > *:nth-child(3)'));
```

### scrollToSlide

**Arguments:** Element

Scrolls slider to specified element

### Destroy

**Arguments:** None

Removes everything that the A11YSlider created in the DOM.

## Events
```js
// Example use of the 'afterChange' event
slider.addEventListener('afterChange', function (e) {
    console.log(e.detail.currentSlide);
});
```

### init

**Detail:** a11yslider

Fires after slider initialization

### beforeChange

**Detail:** currentSlide, nextSlide, a11yslider

Fires before slider changes slide

### beforeChange

**Detail:** currentSlide, a11yslider

Fires after slider changes slide

### destroy

**Detail:** a11yslider

Fires after the slider is destroyed

## Browser support

A11YSlider works on all modern browsers including IE11. See notes for some caveats.

## Notes

- Non-modern browsers that doesn't support [ScrollToOptions](https://developer.mozilla.org/en-US/docs/Web/API/ScrollToOptions) will not have smooth scrolling when switching slides. Using a polyfill like [smoothscroll](https://github.com/iamdustan/smoothscroll) may work. Haven't tested yet

#### Todo

- A lot