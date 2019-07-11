import React, { Component } from 'react';
import Page from '../Page';
import SearchHighlight from '../../components/SearchHighlight';

// eslint-disable-next-line react/prefer-stateless-function
class About extends Component {
  render() {
    return (
      <Page theme={'four'}>
        <h1>Regex Playground</h1>
        <SearchHighlight />
      </Page>
    );
  }
}

export default About;
