import React from 'react';
import GithubCorner from 'react-github-corner';
import Layout from '../components/layout';
import Sidebar from '../components/Sidebar';
import Intro from '../components/Intro';
import Examples from '../components/Examples';
import Download from '../components/Download';

export default () => {
  return (
    <Layout>
      <Sidebar />
      <div id="wrapper">
        <Intro id="one" className="wrapper fullscreen style2 spotlights" />
        <Examples id="two" className="wrapper style1 fade-up" />
        <Download id="three" className="wrapper style3 fade-up" />
      </div>
      <GithubCorner
        href="https://github.com/mmahandev/a11y-slider"
        direction="right"
        size="120"
        svgStyle={{ position: 'fixed', zIndex: 9001 }}
      />
    </Layout>
  );
}