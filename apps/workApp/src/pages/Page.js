import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withRouter } from 'react-router-dom';
import themes from '../../styles/theme.scss';

class Page extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pathname: this.props.location.pathname,
    };
  }

  render() {
    const {
      children,
      location: {
        state,
      },
      theme
    } = this.props;
    const cx = cn({
      page: true,
      'page--prev': this.state.pathname !== this.props.location.pathname,
      [themes[theme]]: themes[theme],
    })

    return (
      <section className={cx} >
        <div className="page__inner">
          {children}
        </div>
      </section>
    );
  }
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  background: PropTypes.string,
};

export default withRouter(Page);