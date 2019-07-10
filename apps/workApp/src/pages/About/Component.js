import React, { Component } from 'react';
import Anime from 'react-anime';
import Page from '../Page';

const App = (props) => (
  <Anime key={'notCool' + Date.now()} opacity={[0, 1]} translateY={'1em'} delay={(e, i) => (i+1) * 500}>
    <h1>Blog Post</h1>
    <section>
      <p>Upon this, Daggoo, with either hand upon the gunwale to steady his way, swiftly slid aft, and then erecting himself volunteered his lofty shoulders for a pedestal.</p>
      <p>"Good a mast-head as any, sir. Will you mount?"</p>
      <p>"That I will, and thank ye very much, my fine fellow; only I wish you fifty feet taller."</p><p>Upon this, Daggoo, with either hand upon the gunwale to steady his way, swiftly slid aft, and then erecting himself volunteered his lofty shoulders for a pedestal.</p>
      <p>"Good a mast-head as any, sir. Will you mount?"</p>
      <p>"That I will, and thank ye very much, my fine fellow; only I wish you fifty feet taller."</p><p>Upon this, Daggoo, with either hand upon the gunwale to steady his way, swiftly slid aft, and then erecting himself volunteered his lofty shoulders for a pedestal.</p>
      <p>"Good a mast-head as any, sir. Will you mount?"</p>
      <p>"That I will, and thank ye very much, my fine fellow; only I wish you fifty feet taller."</p>
    </section>
  </Anime>
);

// eslint-disable-next-line react/prefer-stateless-function
class About extends Component {
  render() {
    return (
      <Page theme={'four'}>
        <App />
      </Page>
    );
  }
}

export default About;
