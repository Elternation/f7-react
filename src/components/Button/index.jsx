import React      from 'react';
import PropTypes  from 'prop-types';
import classNames from 'classnames';

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
      return <a {...events_handlers} className={this._getClassNames()}>{this.props.children}</a>;
    }

    if (this.props.input) {
      return <input {...events_handlers} type="submit" className={this._getClassNames()} value={this.props.children}/>;
    }

    return <button {...events_handlers} className={this._getClassNames()}>{this.props.children}</button>;
  }
}

F7Button.propTypes = {
  className: PropTypes.string,
  children : PropTypes.string,
  link     : PropTypes.bool,
  input    : PropTypes.bool,
};

export default F7Button;
