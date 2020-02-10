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
        this.sliderStyles = this.props.slidercss;
        this.slideItemStyles = this.props.slidecss;

        // CSS String to be used by code preview
        this.cssCodePreview = `
            .slider {
                ${this.props.slidercss}
            }

            .slider > * {
                ${this.props.slidecss}
            }
        `;

        // Loop through CSS media queries for code preview and styled-components
        if (this.props.slidecssmq !== undefined) {
            this.props.slidecssmq.forEach(mq => {
                this.slideItemStyles = this.slideItemStyles.concat(`
                    @media (min-width: ${mq.breakpoint}px) {
                        ${mq.styles}
                    }
                `);

                this.cssCodePreview = this.cssCodePreview.concat(`
                    @media (min-width: ${mq.breakpoint}px) {
                        .slider > * {
                            ${mq.styles}
                        }
                    }
                `)
            });
        }

        // JS String to be used by code preview
        this.jsCodePreview = this.props.codePreview ?? `
            new A11YSlider(document.querySelector('.slider')
                ${this.props.options ? `, ${JSON.stringify(this.props.options, false)}` : ''}
            );
        `;
    }

    componentDidMount() {
        this.slider = new A11YSlider(this.example, this.options);
    }

    componentWillUnmount() {
        this.slider.destroy();
    }

    render() {
        const Slider = styled.ul`${this.sliderStyles}`;
        const Slide = styled.li`${this.slideItemStyles}`;

        return (
            <div className="example" style={this.props.style}>
                {this.props.title && <h2 className="example-title">{this.props.title}</h2>}

                <Slider className="slider" ref={el => this.example = el}>
                    {[...Array(this.props.amount)].map((e, i) => <Slide key={i}><div>{i + 1}</div></Slide>)}
                </Slider>

                <div className="example-code">
                    {this.props.hidejs !== true &&
                        <CodeBlock
                            language="js"
                            value={prettier.format(this.jsCodePreview, {
                                parser: 'babel',
                                plugins: [parserBabylon],
                                printWidth: this.props.hidecss ? 200 : 60
                            })}
                        />
                    }

                    {this.props.slidercss && this.props.slidecss && this.props.hidecss !== true &&
                        <CodeBlock
                            style={{display: this.props.hidecss === true ? 'none' : 'block'}}
                            language="css"
                            value={prettier.format(this.cssCodePreview, {
                                parser: 'css',
                                plugins: [parserCss],
                            })}
                        />
                    }
                </div>
            </div>
        );
    }
}