import React, { PureComponent } from 'react';
import cn from 'classnames';
import Header from '../../components/Header';

import styles from '../../../styles/common.scss';
import themes from '../../../styles/theme.scss';

// eslint-disable-next-line react/prefer-stateless-function
class Main extends PureComponent {
  render() {
    const { children, location } = this.props;

    return (
      <>
        <section className={cn(styles.themeBackground, themes[this.props.theme])}>
          <Header location={location} />
          {children}
        </section>
      </>
    );
  }
}

export default Main;
