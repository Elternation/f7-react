import React     from 'react';
import PropTypes from 'prop-types';

class F7DialogButton extends React.Component {
  render() {
    return null;
  }
}

F7DialogButton.propTypes = {
  children: PropTypes.string.isRequired,
  color   : PropTypes.string,
  cssClass: PropTypes.string,
  onClick : PropTypes.func,
  close   : PropTypes.bool,
  bold    : PropTypes.bool,
};

export default F7DialogButton;
