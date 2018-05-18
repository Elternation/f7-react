import React              from 'react';
import PropTypes          from 'prop-types';
import classNames         from 'classnames';

import F7Badge            from '../Badge';

class F7Icon extends React.Component {
  _getClassNames() {
    let class_object = {
      'icon'   : true,
      'f7-icons': true,
    };

    if (this.props.color) {
      class_object[`color-${this.props.color}`] = true;
    }

    return classNames(class_object);
  }

  _getBadge() {
    if (!this.props.badge) {
      return;
    }

    return <F7Badge color={this.props.badgeColor}>{this.props.badge}</F7Badge>;
  }

  render() {
    return <i className={this._getClassNames()}>{this.props.type}{this._getBadge()}</i>;
  }
}

F7Icon.propTypes = {
  color: PropTypes.string,
  type : PropTypes.string.isRequired,
  badge: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  badgeColor: PropTypes.string
};

export default F7Icon;
