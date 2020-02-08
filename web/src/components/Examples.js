import React from 'react';
import A11YSlider from 'a11y-slider';
import Section from './Section';
import Helmet from 'react-helmet';
import { withPrefix } from "gatsby"

// https://reactjs.org/docs/integrating-with-other-libraries.html
export default class Examples extends React.Component {
    constructor(props) {
        super(props);

        // Enable if running dev:web in the main library for local testing
        this.useLocalA11Y = false;
    }

    componentDidMount() {
        if (!this.useLocalA11Y) {
            this.initA11YSlider(A11YSlider);
        } else {
            setTimeout(() => {
                if (window.A11YSlider !== undefined) {
                    this.initA11YSlider(window.A11YSlider);
                }
            }, 1000);
        }
    }

    componentWillUnmount() {
        this.slider1.destroy();
        this.slider2.destroy();
        this.slider3.destroy();
    }

    initA11YSlider(A11YLibrary) {
        this.slider1 = new A11YLibrary(this.example1);
        this.slider2 = new A11YLibrary(this.example2);
        this.slider3 = new A11YLibrary(this.example3, { autoplay: true, autoplaySpeed: 2500 });
    }

    render() {
        return (
            <Section {...this.props}>
                {this.useLocalA11Y && (
                    <Helmet>
                        <script src={withPrefix('a11y-slider.js')} type="text/javascript" />
                    </Helmet>
                )}
                <h1>A11Y Slider</h1>
                <p>Library for simple and accessible sliders. This is a very early version and the API can possibly change at any time.</p>
                <h2>Examples</h2>
                <small className="custom-small">Code samples coming soon™</small>
                <ul className="slider example1" ref={el => this.example1 = el}>
                    {[...Array(5)].map((e, i) => <li key={i}><div>{i + 1}</div></li>)}
                </ul>
                <ul className="slider example2" ref={el => this.example2 = el}>
                    {[...Array(8)].map((e, i) => <li key={i}><div>{i + 1}</div></li>)}
                </ul>
                <ul className="slider example3" ref={el => this.example3 = el}>
                    {[...Array(10)].map((e, i) => <li key={i}><div>{i + 1}</div></li>)}
                </ul>
            </Section>
        );
    }
}