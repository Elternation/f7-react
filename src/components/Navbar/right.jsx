import React              from 'react';
import PropTypes          from 'prop-types';

class F7NavbarRight extends React.Component {
  render() {
    return <div className="right">
      {this.props.children}
    </div>;
  }
}

F7NavbarRight.propTypes = {
  children  : PropTypes.node,
};

export default F7NavbarRight;
