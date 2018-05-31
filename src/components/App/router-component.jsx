import ReactDOM  from 'react-dom';
import React     from 'react';
import PropTypes from 'prop-types';

class F7RouterComponent extends React.Component {
  render() {
    return ReactDOM.createPortal(this.props.children, this.props.portal);
  }
}

F7RouterComponent.propTypes = {
  children: PropTypes.node.isRequired,
  portal  : PropTypes.instanceOf(HTMLElement)
};

export default F7RouterComponent;
