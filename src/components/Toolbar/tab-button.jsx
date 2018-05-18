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
    if (!this.props.F7icon) {
      return;
    }

    return <F7Icon type={this.props.F7icon} color={this.props.iconColor} badge={this.props.badge} badgeColor={this.props.badgeColor}/>;
  }

  _getLabel() {
    if (!this.props.children) {
      return;
    }

    return <span className="tabbar-label">{this.props.children}</span>;
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
  F7icon    : PropTypes.string.isRequired,
  iconColor : PropTypes.string,
  children  : PropTypes.string,
  active    : PropTypes.bool,
  badge     : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  badgeColor: PropTypes.string
};

export default F7TabbarButton;
