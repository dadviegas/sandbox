import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';

// eslint-disable-next-line react/prefer-stateless-function
class App extends PureComponent {
  _isMounted = false;

  state = {
    shouldRedirect: false,
  };

  componentDidMount() {
    this._isMounted = true;
    setTimeout(() => {
      if (this._isMounted) {
        this.setState({
          shouldRedirect: true,
        })
      }
    }, this.props.splashTime)
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { shouldRedirect } = this.state;

    return (
      <>
        { shouldRedirect && <Redirect to='/home'/> }
        dadviegas.github.com
      </>
    );
  }
}

export default App;
