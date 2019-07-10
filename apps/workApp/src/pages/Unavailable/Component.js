import React, { PureComponent } from 'react';
import Page from '../Page';
import Loader from '../../components/Loader';

// eslint-disable-next-line react/prefer-stateless-function
class App extends PureComponent {
  render() {
    return (
      <Page theme={'two'}>
        <div className="pt5" >
          <h1 className="tc">404 - Page Not Found</h1>
          <Loader />
        </div>
      </Page>
    );
  }
}

export default App;
