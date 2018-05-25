import React              from 'react';
import PropTypes          from 'prop-types';

import F7ListBaseElement  from '../../../../helpers/components/ListItemBaseElement';

class F7LinkListItem extends React.Component {
  render() {
    return <F7ListBaseElement {...this.props}>
      <a href={this.props.href}>{this.props.children}</a>
    </F7ListBaseElement>;
  }
}

F7LinkListItem.propTypes = {
  className: PropTypes.string,
  children : PropTypes.string.isRequired,
  href     : PropTypes.string.isRequired,
};

export default F7LinkListItem;
