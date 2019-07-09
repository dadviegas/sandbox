import React, { PureComponent } from 'react';
import Page from '../Page';

// eslint-disable-next-line react/prefer-stateless-function
class App extends PureComponent {
  render() {
    return (
      <Page>
        <div className="pt5" >
          <h1 className="tc">dadviegas.github.com</h1>
        </div>
      </Page>
    );
  }
}

export default App;
