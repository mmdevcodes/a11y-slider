import React from 'react';
import ReactMarkdown from 'react-markdown';
import { graphql, useStaticQuery } from 'gatsby';
import Section from './Section';
import CodeBlock from './CodeBlock';

export default props => {
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
        allowNode={node => {
          const { type, depth } = node;

          // Leave out the introduction text
          if (
            node.children?.[0]?.value?.includes(
              'Library for simple and accessible sliders'
            )
          ) {
            return false;
          }

          // Do not render <h1> tags
          if (type === 'heading' && depth === 1) return false;

          return true;
        }}
        renderers={{
          code: CodeBlock,
          table: ({ children }) => {
            // Wrap table in responsive DIV
            return (
              <div className="table-wrapper">
                <table>{children}</table>
              </div>
            );
          },
        }}
        parserOptions={{ gfm: true }}
        escapeHtml={false}
      />
    </Section>
  );
};
