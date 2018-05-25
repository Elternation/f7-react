import React              from 'react';
import PropTypes          from 'prop-types';
import classNames         from 'classnames';

import F7ListBaseElement  from '../../../../helpers/components/ListItemBaseElement';

class F7ButtonListItem extends React.Component {
  render() {
    return <F7ListBaseElement {...this.props} className={classNames(['item-link', 'list-button', this.props.className])}>
      {this.props.children}
    </F7ListBaseElement>;
  }
}

F7ButtonListItem.propTypes = {
  className: PropTypes.string,
  children : PropTypes.string,
};

export default F7ButtonListItem;
