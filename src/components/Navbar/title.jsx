import React              from 'react';
import PropTypes          from 'prop-types';

class F7NavbarTitle extends React.Component {
  render() {
    return <div className="title">
      {this.props.children}
    </div>;
  }
}

F7NavbarTitle.propTypes = {
  children  : PropTypes.node,
};

export default F7NavbarTitle;
