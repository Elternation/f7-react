import React              from 'react';
import PropTypes          from 'prop-types';

import F7ListBaseElement  from '../../../../helpers/components/ListItemBaseElement';

import F7Link             from '../../../Link';

class F7LinkListItem extends React.Component {
  render() {
    return <F7ListBaseElement {...this.props}>
      <F7Link {...this.props}/>
    </F7ListBaseElement>;
  }
}

F7LinkListItem.propTypes = {
  className: PropTypes.string,
  children : PropTypes.string.isRequired,
  href     : PropTypes.string.isRequired,
};

export default F7LinkListItem;
