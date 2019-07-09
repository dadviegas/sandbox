import React, { PureComponent } from 'react';
import Navbar from '../../components/Navbar';

// eslint-disable-next-line react/prefer-stateless-function
class App extends PureComponent {
  render() {
    return (
      <>
        <Navbar />
        {this.props.location.pathname}
      </>
    );
  }
}

export default App;
