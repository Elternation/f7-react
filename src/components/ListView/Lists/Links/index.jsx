import React              from 'react';
import PropTypes          from 'prop-types';
import classNames         from 'classnames';

import F7SimpleItem       from '../../Items/Simple';

import F7BaseList         from '../Base';

class F7LinksList extends React.Component {
  render() {
    return <F7BaseList  {...this.props} className={classNames(['simple-list', this.props.className])}>
      {this.props.children}
    </F7BaseList>;
  }
}

F7LinksList.Item = F7SimpleItem;

F7LinksList.propTypes = {
  className: PropTypes.string,
  children : PropTypes.node
};

export default F7LinksList;
