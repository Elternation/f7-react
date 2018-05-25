import React            from 'react';
import PropTypes        from 'prop-types';
import classNames       from 'classnames';

import Navbar           from '../Navbar';
import Toolbar          from '../Toolbar';

class F7Page extends React.Component {
  constructor(props) {
    super(props);

    if (props.onInit) {
      document.addEventListener('page:init', (event) => {
        if (event.detail.name !== props.name) {
          return;
        }

        props.onInit(event);
      });
    }
  }

  _checkChildOrder() {
    let navbar = null,
      toolbar = null,
      children = [];

    React.Children.map(this.props.children, (childNode) => {
      switch (childNode.type) {
        case Navbar:
          navbar = childNode;
          break;
        case Toolbar:
          toolbar = childNode;
          break;
        default:
          children.push(childNode);
      }
    });

    return {
      navbar,
      toolbar,
      children
    };
  }

  _getHTMLid() {
    if (this.props.id === true) {
      return this.props.name;
    }

    return this.props.id;
  }

  render() {
    let { navbar, toolbar, children } = this._checkChildOrder();

    return <div onClick={this.props.onClick} id={this._getHTMLid()} data-name={this.props.name} className={classNames([this.props.className, 'page'])}>
      {navbar && this.props.navbarType === 'fixed' ? navbar : undefined}
      {toolbar && this.props.toolbarType === 'fixed' ? toolbar : undefined}
      <div className="page-content">
        {navbar && this.props.navbarType === 'static' ? navbar : undefined}
        {children}
        {toolbar && this.props.toolbarType === 'static' ? toolbar : undefined}
      </div>
    </div>;
  }
}

F7Page.defaultProps = {
  navbarType : 'fixed',
  toolbarType: 'fixed',
};

F7Page.propTypes = {
  children   : PropTypes.node,
  navbarType : PropTypes.oneOf([
    'static',
    'fixed'
  ]),
  toolbarType: PropTypes.oneOf([
    'static',
    'fixed'
  ]),
  className  : PropTypes.string,
  name       : PropTypes.string.isRequired,
  id         : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  onClick    : PropTypes.func,
  onInit     : PropTypes.func,
};

export default F7Page;
