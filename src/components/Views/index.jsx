import React              from 'react';
import PropTypes          from 'prop-types';
import classNames         from 'classnames';

class F7Views extends React.Component {
  render() {
    return <div className={classNames([this.props.className, 'views'])}>
      {this.props.children}
    </div>;
  }
}

F7Views.propTypes = {
  children     : PropTypes.node.isRequired,
  className    : PropTypes.string
};

export default F7Views;
