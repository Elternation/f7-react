import React      from 'react';
import PropTypes  from 'prop-types';

class F7LoginScreenTitle extends React.Component {
  render() {
    return <div className="login-screen-title">{this.props.children}</div>;
  }
}

F7LoginScreenTitle.propTypes = {
  children : PropTypes.string
};

export default F7LoginScreenTitle;
