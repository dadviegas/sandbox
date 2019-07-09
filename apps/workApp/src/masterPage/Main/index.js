import Component from './Component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  theme
} from '../../app';

const mapStateToProps = createStructuredSelector({
  theme: theme.selectors.getTheme,
});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(Component);
