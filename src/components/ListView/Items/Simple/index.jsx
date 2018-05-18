import React              from 'react';
import PropTypes          from 'prop-types';

class F7SimpleListItem extends React.Component {
  render() {
    return <li className={this.props.className}>{this.props.children}</li>;
  }
}

F7SimpleListItem.propTypes = {
  className: PropTypes.string,
  children : PropTypes.string
};

export default F7SimpleListItem;
