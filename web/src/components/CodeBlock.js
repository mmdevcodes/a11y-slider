import React from 'react';
import PropTypes from 'prop-types';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// https://medium.com/young-developer/react-markdown-code-and-syntax-highlighting-632d2f9b4ada
export default class CodeBlock extends React.PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string
  };

  static defaultProps = {
    language: null
  };

  render() {
    let { language, value } = this.props;

    if (language === 'html') language = 'markup';
    if (language === 'js') language = 'javascript';
    if (language === 'css') language = 'css';

    SyntaxHighlighter.registerLanguage('markup', markup);
    SyntaxHighlighter.registerLanguage('javascript', javascript);
    SyntaxHighlighter.registerLanguage('css', css);

    return (
      <SyntaxHighlighter
        language={language}
        style={atomDark}
        customStyle={{
          padding: 0,
          background: 'rgba(0,5,0,.65)',
          margin: null
        }}
      >
        {value}
      </SyntaxHighlighter>
    );
  }
}
