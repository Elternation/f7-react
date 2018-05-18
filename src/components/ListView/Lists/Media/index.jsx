import React              from 'react';
import PropTypes          from 'prop-types';
import classNames         from 'classnames';

import F7MediaItem        from '../../Items/Media';

import F7BaseList         from '../Base';

class F7MediaList extends React.Component {
  render() {
    return <F7BaseList {...this.props} className={classNames(['media-list', this.props.className])}>
      {this.props.children}
    </F7BaseList>;
  }
}

F7MediaList.Item = F7MediaItem;

F7MediaList.propTypes = {
  className: PropTypes.string,
  children : PropTypes.node
};

export default F7MediaList;
