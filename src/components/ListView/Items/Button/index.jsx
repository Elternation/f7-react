import React              from 'react';
import PropTypes          from 'prop-types';
import classNames         from 'classnames';

class F7ButtonListItem extends React.Component {
  render() {
    return <li className={classNames(['item-link', 'list-button', this.props.className])}>{this.props.children}</li>;
  }
}

F7ButtonListItem.propTypes = {
  className: PropTypes.string,
  children : PropTypes.string,
};

export default F7ButtonListItem;
