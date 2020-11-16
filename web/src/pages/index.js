import React from 'react';
import GithubCorner from 'react-github-corner';
import Layout from '../components/layout';
import Sidebar from '../components/Sidebar';
import About from '../components/About';
import Examples from '../components/Examples';
import Download from '../components/Download';

export default class Index extends React.Component {
  componentDidMount() {
    if (typeof window !== `undefined`) {
      const FocusOverlay = require("focus-overlay").default;

      this.focusOverlay = new FocusOverlay(null, { zIndex: 10001 });
    }
  }

  componentWillUnmount() {
    if (typeof window !== `undefined`) {
      this.focusOverlay.destroy();
    }
  }

  render() {
    return (
      <Layout>
        <Sidebar />
        <div id="wrapper">
          <Examples id="examples" className="wrapper style1 fade-up" />
          <About id="about" className="wrapper fullscreen style2 spotlights" />
          <Download id="download" className="wrapper style3 fade-up" />
        </div>
        <GithubCorner
          href="https://github.com/mmahandev/a11y-slider"
          direction="right"
          size="110"
          svgStyle={{ position: 'fixed', zIndex: 9001 }}
          className="github-corner"
        />
      </Layout>
    );
  }
}