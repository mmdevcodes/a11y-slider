/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const fetch = require('cross-fetch');

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  // Get latest readme from main repo
  const result = await fetch(
    'https://raw.githubusercontent.com/mmahandev/a11y-slider/master/README.md'
  );
  const readme = await result.text();

  // create node for build time that passes data to components
  createNode({
    // custom fields
    markdown: readme,
    // required fields
    id: `readme-data`,
    parent: null,
    children: [],
    internal: {
      type: `Readme`,
      contentDigest: createContentDigest(readme),
    },
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: 'empty'
    }
  })
}