import React              from 'react';
import PropTypes          from 'prop-types';

import F7ListBaseElement  from '../../../../helpers/components/ListItemBaseElement';

class F7SimpleListItem extends React.Component {
  render() {
    return <F7ListBaseElement {...this.props}>{this.props.children}</F7ListBaseElement>;
  }
}

F7SimpleListItem.propTypes = {
  className: PropTypes.string,
  children : PropTypes.string
};

export default F7SimpleListItem;
