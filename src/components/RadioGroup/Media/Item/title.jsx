import React              from 'react';
import PropTypes          from 'prop-types';

class F7MediaRadioGroupItemTitle extends React.Component {
  render() {
    return <div className="item-title">
      {this.props.children}
    </div>;
  }
}

F7MediaRadioGroupItemTitle.propTypes = {
  children: PropTypes.node
};

export default F7MediaRadioGroupItemTitle;
