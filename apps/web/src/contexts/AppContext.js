import React from 'react';
import PropTypes from 'prop-types';

export const AppContext = React.createContext();

const themes = ['royal', 'solidVault', 'fireWatch', 'servQuick', 'sunrise', 'mirage', 'stellar'];

class AppProvider extends React.Component {
  state = {
    // eslint-disable-next-line react/no-unused-state
    themes,
    // eslint-disable-next-line react/no-unused-state
    theme: 'servQuick',
  }

  render() {
    const { children } = this.props;

    return (
      <AppContext.Provider value={this.state}>
        {children}
      </AppContext.Provider>
    );
  }
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
