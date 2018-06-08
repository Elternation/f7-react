import React     from 'react';
import PropTypes from 'prop-types';

class F7EmptyElement extends React.Component {
  render() {
    return this.props.children;
  }
}

F7EmptyElement.propTypes = {
  children: PropTypes.node,
};

export default F7EmptyElement;
