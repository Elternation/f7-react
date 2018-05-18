import React              from 'react';
import PropTypes          from 'prop-types';

class F7LinkListItem extends React.Component {
  render() {
    return <li className={this.props.className}>
      <a href={this.props.href}>{this.props.children}</a>
    </li>;
  }
}

F7LinkListItem.propTypes = {
  className: PropTypes.string,
  children : PropTypes.string.isRequired,
  href     : PropTypes.string.isRequired,
};

export default F7LinkListItem;
