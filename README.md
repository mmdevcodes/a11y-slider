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
  container: true,
  navBtns: true,
  prevBtn: HTMLElement,
  nextBtn: HTMLElement,
  dots: true,
  adaptiveHeight: false
}
```

`prevBtn` and `nextBtn` can one or several HTML elements. For example via querySelector or querySelectorAll. If not supplied it will generate buttons if `navBtns` is true.

## Methods

```js
// Example use of the 'scrollToSlide' method
slider.scrollToSlide(document.querySelector('.slider > *:nth-child(3)'));
```

| Method        	| Arguments                           	| Description                                               	|
|---------------	|-------------------------------------	|-----------------------------------------------------------	|
| scrollToSlide 	| Element                             	| Scrolls slider to specified element                       	|
| destroy       	| currentSlide, nextSlide, a11yslider 	| Removes everything that the A11YSlider created in the DOM 	|

## Events
```js
// Example use of the 'afterChange' event
slider.addEventListener('afterChange', function (e) {
    console.log(e.detail.currentSlide);
});
```

Events must be called before initializing the slider!

| Event        	| Detail                              	| Description                         	|
|--------------	|-------------------------------------	|-------------------------------------	|
| init         	| a11yslider                          	| Fires after slider initialization   	|
| beforeChange 	| currentSlide, nextSlide, a11yslider 	| Fires before slide change           	|
| afterChange  	| currentSlide, a11yslider            	| Fires after slide change            	|
| destroy      	| a11yslider                          	| Fires after the slider is destroyed 	|

## Browser support

A11YSlider works on all modern browsers including IE11. See notes for some caveats.

## Notes

- Non-modern browsers that doesn't support [ScrollToOptions](https://developer.mozilla.org/en-US/docs/Web/API/ScrollToOptions) will not have smooth scrolling when switching slides. A polyfill like [smoothscroll](https://github.com/iamdustan/smoothscroll) can be used to fix this.

#### Todo

- `items` option
- Look into reducing size of bundle
- Add skip link