import React              from 'react';
import PropTypes          from 'prop-types';

class F7BaseListItemAfterTitle extends React.Component {
  render() {
    return <div className="item-after">
      {this.props.children}
    </div>;
  }
}

F7BaseListItemAfterTitle.propTypes = {
  children: PropTypes.node
};

export default F7BaseListItemAfterTitle;
