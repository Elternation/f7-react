import React              from 'react';
import PropTypes          from 'prop-types';

class F7BaseListItemHeader extends React.Component {
  render() {
    return <div className="item-header">
      {this.props.children}
    </div>;
  }
}

F7BaseListItemHeader.propTypes = {
  children: PropTypes.node
};

export default F7BaseListItemHeader;
