import React from 'react';
import PropTypes from 'prop-types';

export const AppContext = React.createContext();

const themes = [
  {
    name: 'Royal',
    value: 'royal',
  },
  {
    name: 'Solid Vault',
    value: 'solidVault',
  },
  {
    name: 'Fire Watch',
    value: 'fireWatch',
  },
  {
    name: 'Quick',
    value: 'servQuick',
  },
  {
    name: 'Sunrise',
    value: 'sunrise',
  },
  {
    name: 'Mirage',
    value: 'mirage',
  },
  {
    name: 'Stellar',
    value: 'stellar',
  },
];

class AppProvider extends React.Component {
  state = {
    // eslint-disable-next-line react/no-unused-state
    themes,
    // eslint-disable-next-line react/no-unused-state
    theme: themes[0],
    // eslint-disable-next-line react/no-unused-state
    themeSelect: (event) => {
      const { value } = event.target;
      // eslint-disable-next-line react/no-unused-state
      this.setState({ theme: themes.find(theme => theme.value === value) });
    },
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
