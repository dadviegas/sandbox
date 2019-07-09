import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withRouter } from 'react-router-dom';
import themes from '../../styles/theme.scss';

function Page({
  children,
  location: {
    state,
  },
  theme
}) {
  const cx = cn({
    page: true,
    'page--prev': state && state.prev,
    [themes[theme]]: themes[theme],
  })

  return (
    <section
      className={cx}
    >
      <div className="page__inner">
        {children}
      </div>
    </section>
  );
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  background: PropTypes.string,
};

export default withRouter(Page);