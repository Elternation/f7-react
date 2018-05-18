import React              from 'react';
import PropTypes          from 'prop-types';

class F7BlockFooter extends React.Component {
  render() {
    return <div className="block-footer">
      {this.props.children}
    </div>;
  }
}

F7BlockFooter.propTypes = {
  children : PropTypes.node.isRequired
};

export default F7BlockFooter;
