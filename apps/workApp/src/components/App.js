import React, { Component } from 'react';
import styled from 'styled-components';
import cn from 'classnames';

import styles from '../../styles/common.scss';
import Navbar from './Navbar';

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
    console.log(this.props)
    return (
      <section className={cn(styles.themeBackground)}>
        <Navbar />
        <Wrapper>
          <Title>
            {this.props.location.pathname}
          </Title>
        </Wrapper>
      </section>
    );
  }
}

export default App;
