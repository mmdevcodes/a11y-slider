import React from 'react';
import styled from 'styled-components';
import A11YSlider from 'a11y-slider';
import CodeBlock from './CodeBlock';
import prettier from 'prettier/standalone';
import parserCss from 'prettier/parser-postcss';
import parserBabylon from 'prettier/parser-babylon';

// https://reactjs.org/docs/integrating-with-other-libraries.html
export default class Example extends React.Component {
    constructor(props) {
        super(props);

        this.options = this.props.options ?? {};
    }

    componentDidMount() {
        this.slider = new A11YSlider(this.example, this.options);
    }

    componentWillUnmount() {
        this.slider.destroy();
    }

    render() {
        const Slider = styled.ul`${this.props.slidercss}`;
        const Slide = styled.li`${this.props.slidecss}`;

        return (
            <div className="example">
                {this.props.title && <h2 className="example-title">{this.props.title}</h2>}
                <Slider className="slider" ref={el => this.example = el}>
                    {[...Array(this.props.amount)].map((e, i) => <Slide key={i}><div>{i + 1}</div></Slide>)}
                </Slider>
                <div className="example-code">
                    <CodeBlock
                        language="js"
                        value={prettier.format(`
                            new A11YSlider(document.querySelector('.slider')
                                ${this.props.options ? `, ${JSON.stringify(this.props.options)}` : ''}
                            );
                        `, {
                            parser: 'babel',
                            plugins: [parserBabylon]
                        })}
                    />
                    {this.props.slidercss && this.props.slidecss &&
                        (
                            <CodeBlock
                                language="css"
                                value={prettier.format(`
                                    .slider {
                                        ${this.props.slidercss}
                                    }

                                    .slider > * {
                                        ${this.props.slidecss}
                                    }
                                `, {
                                    parser: 'css',
                                    plugins: [parserCss]
                                })}
                            />
                        )
                    }
                </div>
            </div>
        );
    }
}