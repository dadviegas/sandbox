import Component from './Component';
import { connect } from 'react-redux';

const mapStateToProps = () => ({
  splashTime: 2000,
});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(Component);
