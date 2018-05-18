import React      from 'react';
import PropTypes  from 'prop-types';
import _          from 'lodash';
import classNames from 'classnames';

class F7Link extends React.Component {
  _getClassNames() {
    return classNames({
      'link'     : true,
      'icon-only': this.props.icon && !_.isEmpty(this.props.children),
      'external' : this.props.external
    });
  }

  render() {
    return <a onClick={this.props.onClick} className={this._getClassNames()} href={this.props.href}>{this.props.children}</a>;
  }
}

F7Link.propTypes = {
  icon    : PropTypes.element,
  children: PropTypes.string,
  external: PropTypes.bool,
  href    : PropTypes.string,
  onClick : PropTypes.func
};

export default F7Link;
