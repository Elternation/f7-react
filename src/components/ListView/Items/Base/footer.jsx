import React              from 'react';
import PropTypes          from 'prop-types';

class F7BaseListItemFooter extends React.Component {
  render() {
    return <div className="item-footer">
      {this.props.children}
    </div>;
  }
}

F7BaseListItemFooter.propTypes = {
  children: PropTypes.node
};

export default F7BaseListItemFooter;
