import React, { Component } from 'react';
import styled from 'styled-components';
import { AppContext } from '../contexts/AppContext';
import cn from 'classnames';

import styles from '../../styles/common.scss';

// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 4em;
  background: transparent;
`;

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <section className={cn(context.theme.value, styles.themeBackground)}>
            <select className="select-css" onChange={context.themeSelect}>
              {
                context.themes.map(theme => <option value={theme.value}>{theme.name}</option>)
              }
            </select>
            <Wrapper>
              <Title>
                test asdsa
              </Title>
            </Wrapper>
          </section>
        )}
      </AppContext.Consumer>
    );
  }
}

export default App;
