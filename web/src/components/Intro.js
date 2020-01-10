import React from 'react';
import ReactMarkdown from 'react-markdown';
import { graphql, useStaticQuery } from 'gatsby';
import Section from './Section';
import CodeBlock from './CodeBlock';

export default (props) => {
  const data = useStaticQuery(graphql`
    query {
      readme {
        markdown
      }
    }
  `);

  return (
    <Section {...props}>
      <ReactMarkdown
        source={data.readme.markdown}
        renderers={{
          code: CodeBlock,
          table: ({ children }) => {
            return (
              <div className="table-wrapper">
                <table>{children}</table>
              </div>
            )
          }
        }}
        parserOptions={{ gfm: true }}
        escapeHtml={false}
      />
    </Section>
  );
};
