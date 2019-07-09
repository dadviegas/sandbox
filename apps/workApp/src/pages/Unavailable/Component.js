import React, { PureComponent } from 'react';
import Page from '../Page';

// eslint-disable-next-line react/prefer-stateless-function
class App extends PureComponent {
  render() {
    return (
      <Page theme={'carbon'}>
        <h1>Page not found</h1>
      </Page>
    );
  }
}

export default App;
