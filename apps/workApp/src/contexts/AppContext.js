import React from 'react';
import PropTypes from 'prop-types';
import themes from '../../styles/theme.scss';

export const AppContext = React.createContext();

const availableThemes = [
  {
    name: 'Royal',
    value: themes.royal,
  },
  {
    name: 'Stellar',
    value: themes.stellar,
  },
];

class AppProvider extends React.Component {
  state = {
    // eslint-disable-next-line react/no-unused-state
    themes: availableThemes,
    // eslint-disable-next-line react/no-unused-state
    theme: availableThemes[0],
    // eslint-disable-next-line react/no-unused-state
    themeSelect: (event) => {
      const { value } = event.target;
      // eslint-disable-next-line react/no-unused-state
      this.setState({ theme: availableThemes.find(theme => theme.value === value) });
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
