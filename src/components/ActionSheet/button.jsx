import React            from 'react';
import PropTypes        from 'prop-types';

class F7ActionSheetButton extends React.Component {
  render() {
    return null;
  }
}

F7ActionSheetButton.propTypes = {
  children: PropTypes.string,
  onClick : PropTypes.func,
  bold    : PropTypes.bool,
  color   : PropTypes.string,
  close   : PropTypes.bool,
  disabled: PropTypes.bool,
  bg      : PropTypes.string
};

export default F7ActionSheetButton;
