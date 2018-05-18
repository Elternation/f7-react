import React              from 'react';
import PropTypes          from 'prop-types';
import classNames         from 'classnames';

class F7BlockTitle extends React.Component {
  render() {
    return <div className={classNames(['block-title', this.props.className])}>
      {this.props.children}
    </div>;
  }
}

F7BlockTitle.propTypes = {
  className: PropTypes.string,
  children : PropTypes.string.isRequired
};

export default F7BlockTitle;
