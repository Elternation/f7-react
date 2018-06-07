import React                      from 'react';
import PropTypes                  from 'prop-types';
import classNames                 from 'classnames';

import getEventsHandlersFromProps from '../../utils/get-events-handlers-from-props';

import F7Link     from '../Link';

class F7Button extends React.Component {
  _getClassNames() {
    return classNames([
      'button',
      this.props.className,
    ]);
  }

  render() {
    let events_handlers = getEventsHandlersFromProps(this.props);

    if (this.props.link) {
      return <F7Link {...events_handlers} openPopover={this.props.openPopover} openPanel={this.props.openPanel} className={this._getClassNames()}>{this.props.children}</F7Link>;
    }

    if (this.props.input) {
      return <input {...events_handlers} type="submit" className={this._getClassNames()} value={this.props.children}/>;
    }

    return <button {...events_handlers} className={this._getClassNames()}>{this.props.children}</button>;
  }
}

F7Button.propTypes = {
  className   : PropTypes.string,
  children    : PropTypes.node,
  link        : PropTypes.bool,
  input       : PropTypes.bool,
  openPanel   : PropTypes.oneOf(['left', 'right']),
  openPopover : PropTypes.string,
  closePopover: PropTypes.string,
};

export default F7Button;
