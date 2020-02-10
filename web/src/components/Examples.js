import React from 'react';
import Section from './Section';
import SliderExample from './SliderExample';

const Examples = props => {
    return (
        <Section {...props}>
            <h1>A11Y Slider</h1>
            <p>Library for simple and accessible sliders. This is a very early version and the API can possibly change at any time.</p>
            {/* <h2>Examples</h2> */}
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