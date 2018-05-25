import React      from 'react';
import PropTypes  from 'prop-types';
import classNames from 'classnames';

import F7Link     from '../Link';

class F7Button extends React.Component {
  _getClassNames() {
    return classNames([
      'button',
      this.props.className,
    ]);
  }

  _getEventHandlers() {
    let event_handlers = {};

    for (let [key, value] of Object.entries(this.props)) {
      if (key.substring(0,2) !== 'on') {
        continue;
      }

      event_handlers[key] = value;
    }

    return event_handlers;
  }

  render() {
    let events_handlers = this._getEventHandlers();

    if (this.props.link) {
      return <F7Link {...events_handlers} openPanel={this.props.openPanel} className={this._getClassNames()}>{this.props.children}</F7Link>;
    }

    if (this.props.input) {
      return <input {...events_handlers} type="submit" className={this._getClassNames()} value={this.props.children}/>;
    }

    return <button {...events_handlers} className={this._getClassNames()}>{this.props.children}</button>;
  }
}

F7Button.propTypes = {
  className: PropTypes.string,
  children : PropTypes.node,
  link     : PropTypes.bool,
  input    : PropTypes.bool,
  openPanel: PropTypes.oneOf(['left', 'right']),
};

export default F7Button;
