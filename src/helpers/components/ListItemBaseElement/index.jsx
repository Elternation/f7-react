import React                      from 'react';
import PropTypes                  from 'prop-types';
import classNames                 from 'classnames';

import getEventsHandlersFromProps from '../../../utils/get-events-handlers-from-props';

class F7ListBaseItem extends React.Component {
  render() {
    let events_handlers = getEventsHandlersFromProps(this.props);

    return <li {...events_handlers} style={this.props.style} className={classNames([this.props.className, { ripple: this.props.ripple }])}>
      {this.props.children}
    </li>;
  }
}

F7ListBaseItem.propTypes = {
  children : PropTypes.node,
  className: PropTypes.string,
  style    : PropTypes.object,
  ripple   : PropTypes.bool
};

export default F7ListBaseItem;
