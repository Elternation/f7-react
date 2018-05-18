import React              from 'react';
import PropTypes          from 'prop-types';
import classNames         from 'classnames';

class F7DividerListItem extends React.Component {
  render() {
    return <li className={classNames(['item-divider', this.props.className])}>{this.props.title}</li>;
  }
}

F7DividerListItem.propTypes = {
  className: PropTypes.string,
  title    : PropTypes.string,
};

export default F7DividerListItem;
