import React      from 'react';
import PropTypes  from 'prop-types';

class F7LoginScreenBlockFooter extends React.Component {
  render() {
    return <div className="block-footer">
      {this.props.children}
    </div>;
  }
}

F7LoginScreenBlockFooter.propTypes = {
  children : PropTypes.node
};

export default F7LoginScreenBlockFooter;
