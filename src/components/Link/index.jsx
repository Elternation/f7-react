import React            from 'react';
import PropTypes        from 'prop-types';
import _                from 'lodash';
import classNames       from 'classnames';
import Framework7       from 'framework7/dist/framework7.esm.bundle';

import withF7AppContext from '../../utils/with-f7-app-context';

class F7Link extends React.Component {
  constructor() {
    super();

    this._onClick = this._onClick.bind(this);
  }
  _getClassNames() {
    return classNames({
      'link'     : true,
      'icon-only': this.props.icon && !_.isEmpty(this.props.children),
      'external' : this.props.external
    });
  }

  _onClick(event) {
    if (this.props.openPanel) {
      this.props.f7_context.f7.panel.open(this.props.openPanel);
    }

    if (_.isFunction(this.props.onClick)) {
      this.props.onClick(event);
    }
  }

  render() {
    return <a onClick={this._onClick} className={this._getClassNames()} href={this.props.href}>{this.props.icon}{this.props.children}</a>;
  }
}

F7Link.propTypes = {
  icon      : PropTypes.element,
  children  : PropTypes.node,
  external  : PropTypes.bool,
  href      : PropTypes.string,
  onClick   : PropTypes.func,
  openPanel : PropTypes.oneOf(['left', 'right']),
  f7_context: PropTypes.shape({
    f7: PropTypes.instanceOf(Framework7).isRequired,
  })
};

export default withF7AppContext(F7Link);
