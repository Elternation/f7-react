import React              from 'react';
import PropTypes          from 'prop-types';

class F7MediaRadioGroupItemText extends React.Component {
  render() {
    return <div className="item-text">
      {this.props.children}
    </div>;
  }
}

F7MediaRadioGroupItemText.propTypes = {
  children: PropTypes.node
};

export default F7MediaRadioGroupItemText;
