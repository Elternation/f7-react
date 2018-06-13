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
    let classes = {
      'link'     : true,
      'icon-only': this.props.icon && !_.isEmpty(this.props.children),
      'external' : this.props.external,
      'disabled' : this.props.disabled
    };

    if (typeof this.props.openPopover === 'string') {
      classes['popover-open'] = true;
    }

    if (this.props.closePopover === true) {
      classes['popover-close'] = true;
    }

    return classNames(classes);
  }

  _getDataPopover() {
    if (typeof this.props.openPopover !== 'string') {
      return;
    }

    return `.popover-${this.props.openPopover}`;
  }

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
    return <a data-popover={this._getDataPopover()} onClick={this._onClick} className={this._getClassNames()} href={this.props.href}>{this.props.icon}{this.props.children}</a>;
  }
}

F7Link.propTypes = {
  icon        : PropTypes.element,
  children    : PropTypes.node,
  disabled    : PropTypes.bool,
  external    : PropTypes.bool,
  href        : PropTypes.string,
  onClick     : PropTypes.func,
  openPanel   : PropTypes.oneOf(['left', 'right']),
  openPopover : PropTypes.string,
  closePopover: PropTypes.bool,
  f7_context  : PropTypes.shape({
    f7: PropTypes.instanceOf(Framework7).isRequired,
  })
};

export default withF7AppContext(F7Link);
