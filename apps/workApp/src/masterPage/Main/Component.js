import React, { PureComponent } from 'react';
import cn from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import styles from '../../../styles/common.scss';
import themes from '../../../styles/theme.scss';

// eslint-disable-next-line react/prefer-stateless-function
class App extends PureComponent {
  render() {
    const { children, className } = this.props;

    return (
      <section className={cn(styles.themeBackground, themes[this.props.theme])}>
        {children}
      </section>
    );
  }
}

export default App;
