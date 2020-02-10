import React from 'react';
import Section from './Section';
import SliderExample from './SliderExample';

const Examples = props => {
    return (
        <Section {...props}>
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
                title="Sizing with JS"
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
                    new A11YSlider(document.querySelector('.slider'), {
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
        </Section>
    );
}

export default Examples;