import React from 'react';
import A11YSlider from 'a11y-slider';
import Section from './Section';

// https://medium.com/@garrettmac/reactjs-how-to-safely-manipulate-the-dom-when-reactjs-cant-the-right-way-8a20928e8a6
export default class Examples extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        new A11YSlider(this.refs._example1);
        new A11YSlider(this.refs._example2);
        new A11YSlider(this.refs._example3, { autoplay: true, autoplaySpeed: 2500 });
    }

    render() {
        return (
            <Section {...this.props}>
                <h2>Examples</h2>
                <p>Code coming soon™</p>
                <ul className="slider example1" ref="_example1">
                    {[...Array(5)].map((e, i) => <li key={i}><div>{i + 1}</div></li>)}
                </ul>
                <ul className="slider example2" ref="_example2">
                    {[...Array(8)].map((e, i) => <li key={i}><div>{i + 1}</div></li>)}
                </ul>
                <ul className="slider example3" ref="_example3">
                    {[...Array(10)].map((e, i) => <li key={i}><div>{i + 1}</div></li>)}
                </ul>
            </Section>
        );
    }
}