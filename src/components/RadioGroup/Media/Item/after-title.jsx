import React              from 'react';
import PropTypes          from 'prop-types';

class F7MediaRadioGroupItemAfterTitle extends React.Component {
  render() {
    return <div className="item-after">
      {this.props.children}
    </div>;
  }
}

F7MediaRadioGroupItemAfterTitle.propTypes = {
  children: PropTypes.node
};

export default F7MediaRadioGroupItemAfterTitle;
