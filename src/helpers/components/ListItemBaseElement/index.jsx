import React                      from 'react';
import PropTypes                  from 'prop-types';
import classNames                 from 'classnames';
import Framework7                 from 'framework7/dist/framework7.esm.bundle';
import _                          from 'lodash';

import getEventsHandlersFromProps from '../../../utils/get-events-handlers-from-props';
import withF7AppContext           from '../../../utils/with-f7-app-context';

class F7ListBaseItem extends React.Component {
  _onClick(event) {
    if (this.props.openPanel) {
      this.props.f7_context.f7.panel.open(this.props.openPanel);
    }

    if (this.props.closePopover) {
      this.props.f7_context.f7.popover.close();
    }

    if (_.isFunction(this.props.onClick)) {
      this.props.onClick(event);
    }
  }

  render() {
    let events_handlers = getEventsHandlersFromProps(this.props);

    events_handlers.onClick = this._onClick.bind(this);

    return <li {...events_handlers} style={this.props.style} className={classNames([this.props.className, { ripple: this.props.ripple }])}>
      {this.props.children}
    </li>;
  }
}

F7ListBaseItem.propTypes = {
  children    : PropTypes.node,
  className   : PropTypes.string,
  style       : PropTypes.object,
  ripple      : PropTypes.bool,
  onClick     : PropTypes.func,
  openPanel   : PropTypes.oneOf(['left', 'right']),
  openPopover : PropTypes.string,
  closePopover: PropTypes.bool,
  f7_context  : PropTypes.shape({
    f7: PropTypes.instanceOf(Framework7).isRequired,
  })
};

export default withF7AppContext(F7ListBaseItem);
