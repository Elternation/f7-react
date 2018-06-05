import React              from 'react';
import PropTypes          from 'prop-types';
import classNames         from 'classnames';

import F7Icon             from '../Icon';

class F7TabbarButton extends React.Component {
  _getClassNames() {
    return classNames({
      'tab-link'       : true,
      'tab-link-active': this.props.active,
    });
  }

  _getIcon() {
    if (!this.props.icon) {
      return;
    }

    if (typeof this.props.icon === 'string') {
      return <F7Icon type={this.props.icon} color={this.props.iconColor} badge={this.props.badge} badgeColor={this.props.badgeColor}/>;
    }

    return this.props.icon;
  }

  _getLabel() {
    if (!this.props.label) {
      return;
    }

    return <span className="tabbar-label">{this.props.label}</span>;
  }

  render() {
    return <a href={this.props.href} className={this._getClassNames()}>
      {this._getIcon()}
      {this._getLabel()}
    </a>;
  }
}

F7TabbarButton.propTypes = {
  href      : PropTypes.string,
  icon      : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  iconColor : PropTypes.string,
  label     : PropTypes.string,
  active    : PropTypes.bool,
  badge     : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  badgeColor: PropTypes.string
};

export default F7TabbarButton;
