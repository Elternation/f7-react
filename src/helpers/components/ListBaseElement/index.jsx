import React      from 'react';
import PropTypes  from 'prop-types';
import classNames from 'classnames';

import getEventsHandlersFromProps from '../../../utils/get-events-handlers-from-props';

class F7ListBaseElement extends React.Component {
  _getClassNames() {
    let classes = {
      'list'                : true,
      'no-hairlines'        : this.props.noHairlines,
      'no-hairlines-between': this.props.noHairlinesBetween,
      'inset'               : this.props.inset,
      'tablet-inset'        : this.props.tabletInset,
    };

    return classNames([classes, this.props.className]);
  }

  render() {
    let events_handlers = getEventsHandlersFromProps(this.props);

    return <div {...events_handlers} style={this.props.style} className={this._getClassNames()}>
      {this.props.children}
    </div>;
  }
}

F7ListBaseElement.propTypes = {
  children          : PropTypes.node,
  className         : PropTypes.string,
  noHairlines       : PropTypes.bool,
  noHairlinesBetween: PropTypes.bool,
  inset             : PropTypes.bool,
  tabletInset       : PropTypes.bool,
  style             : PropTypes.object,
};

export default F7ListBaseElement;
