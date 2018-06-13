import React              from 'react';
import PropTypes          from 'prop-types';

class F7MediaCheckboxGroupItemAfterTitle extends React.Component {
  render() {
    return <div className="item-after">
      {this.props.children}
    </div>;
  }
}

F7MediaCheckboxGroupItemAfterTitle.propTypes = {
  children: PropTypes.node
};

export default F7MediaCheckboxGroupItemAfterTitle;
