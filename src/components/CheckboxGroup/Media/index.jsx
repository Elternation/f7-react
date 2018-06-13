import React                 from 'react';
import PropTypes             from 'prop-types';
import classNames            from 'classnames';

import F7MediaCheckboxGroupItem from './Item';

import F7BaseList            from '../../ListView/Lists/Base';

class F7MediaCheckboxGroup extends React.Component {
  render() {
    return <F7BaseList {...this.props} className={classNames(['media-list', this.props.className])}>
      {this.props.children}
    </F7BaseList>;
  }
}

F7MediaCheckboxGroup.Item = F7MediaCheckboxGroupItem;

F7MediaCheckboxGroup.propTypes = {
  className: PropTypes.string,
  children : PropTypes.node
};

export default F7MediaCheckboxGroup;
