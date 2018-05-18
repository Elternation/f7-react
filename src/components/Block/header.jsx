import React              from 'react';
import PropTypes          from 'prop-types';

class F7BlockHeader extends React.Component {
  render() {
    return <div className="block-header">
      {this.props.children}
    </div>;
  }
}

F7BlockHeader.propTypes = {
  children : PropTypes.node.isRequired
};

export default F7BlockHeader;
