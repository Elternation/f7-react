import React              from 'react';
import PropTypes          from 'prop-types';
import classNames         from 'classnames';

import F7ListBaseElement  from '../../../../helpers/components/ListItemBaseElement';

class F7DividerListItem extends React.Component {
  render() {
    return <F7ListBaseElement className={classNames(['item-divider', this.props.className])}>{this.props.title}</F7ListBaseElement>;
  }
}

F7DividerListItem.propTypes = {
  className: PropTypes.string,
  title    : PropTypes.string,
};

export default F7DividerListItem;
