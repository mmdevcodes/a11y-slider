import React from 'react';
import Section from './Section';
import SliderExample from './SliderExample';

export default class Examples extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.syncedSlide1.example.addEventListener('beforeChange', e => {
            // Get next element
            const nextSlide = e.detail.nextSlide;
            // Get index to use
            const nextSlideIndex = Array.from(nextSlide.parentNode.children).indexOf(nextSlide);
            // Tell slider to move to slide element based off index
            this.syncedSlide2.slider.scrollToSlide(nextSlideIndex);
        });
    }

    render() {
        return (
            <Section {...this.props}>
                <h1>A11Y Slider</h1>
                <p>Library for simple and accessible sliders.</p>
                <SliderExample
                    title="Single Item"
                    amount={5}
                    slidercss={`
                        display: flex;
                    `}
                    slidecss={`
                        width: 100%;
                        flex: 0 0 auto;
                    `}
                 />
                <SliderExample
                    title="Multiple Items"
                    amount={8}
                    slidercss={`
                        display: flex;
                    `}
                    slidecss={`
                        width: 25%;
                        flex: 0 0 auto;
                    `}
                 />
                <SliderExample
                    title="Items with JS"
                    amount={10}
                    options={{ slidesToShow: 2 }}
                 />
                <SliderExample
                    title="Responsive Pure CSS"
                    amount={10}
                    slidercss={`
                        display: flex;
                    `}
                    slidecss={`
                        width: 100%;
                        flex: 0 0 auto;
                    `}
                    slidecssmq={[
                        {
                            breakpoint: '768',
                            styles: `
                                width: 50%;
                            `
                        },
                        {
                            breakpoint: '960',
                            styles: `
                                width: 33.3333%;
                            `
                        },
                        {
                            breakpoint: '1280',
                            styles: `
                                width: 25%;
                            `
                        },
                    ]}
                 />
                <SliderExample
                    title="Responsive Options"
                    amount={10}
                    options={{
                        slidesToShow: 1,
                        arrows: true,
                        dots: false,
                        responsive: {
                          768: {
                            slidesToShow: 2,
                            arrows: false
                          },
                          960: {
                            disable: true
                          },
                          1280: {
                            disable: false,
                            slidesToShow: 4,
                            dots: true
                          }
                        }
                    }}
                    codePreview={`
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
                    `}
                 />
                <SliderExample
                    title="Autoplay"
                    amount={10}
                    slidercss={`
                        display: flex;
                    `}
                    slidecss={`
                        width: 100%;
                        flex: 0 0 auto;
                    `}
                    options={{ autoplay: true, autoplaySpeed: 2500 }}
                 />
                <SliderExample
                    title="Synced Sliders"
                    amount={10}
                    slidercss={`
                        display: flex;
                    `}
                    slidecss={`
                        width: 100%;
                        flex: 0 0 auto;
                    `}
                    hidejs={true}
                    hidecss={true}
                    style={{marginBottom: '-1em'}}
                    ref={el => this.syncedSlide1 = el}
                 />
                <SliderExample
                    amount={10}
                    options={{ dots: false, arrows: false, slidesToShow: 4 }}
                    hidecss={true}
                    ref={el => this.syncedSlide2 = el}
                    codePreview={`
                        const sliderEl = document.querySelector('.slider');
                        const sliderEl2 = document.querySelector('.slider-2');
                        const slider = new A11YSlider(sliderEl);
                        const slider2 = new A11YSlider(sliderEl2);

                        sliderEl.addEventListener('beforeChange', function (e) {
                            // Get next element
                            const nextSlide = e.detail.nextSlide;
                            // Get index of the next element
                            const nextSlideIndex = Array.from(nextSlide.parentNode.children).indexOf(nextSlide);
                            // Tell 2nd slider to move to slide element based off index
                            slider2.scrollToSlide(nextSlideIndex);
                        });
                    `}
                 />
            </Section>
        );
    }
}