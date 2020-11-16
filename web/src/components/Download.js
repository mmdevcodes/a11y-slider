import React from 'react';
import Section from './Section';

export default (props) => (
    <Section {...props}>
        <div className="row">
          <div className="col-4 col-12-medium">
            <h2>Download</h2>
            <ul className="actions stacked">
              <li>
                <a href="https://github.com/mmahandev/a11y-slider" className="button primary fit">
                  Source Code
                </a>
              </li>
              <li>
                <a href="https://github.com/mmahandev/a11y-slider/releases/latest" className="button primary fit">
                  Get Latest Release
                </a>
              </li>
            </ul>
          </div>
        </div>
    </Section>
);