import React            from 'react';
import PropTypes        from 'prop-types';
import classNames       from 'classnames';

import Navbar           from '../Navbar';
import Toolbar          from '../Toolbar';
import Tabs             from '../Tabs';

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

  _getPageElements() {
    let navbar = null,
      toolbar = null,
      with_tabs = false,
      children = [];

    React.Children.map(this.props.children, (childNode) => {
      switch (childNode.type) {
        case Navbar:
          navbar = childNode;
          break;
        case Toolbar:
          toolbar = childNode;
          break;
        case Tabs:
          with_tabs = true;
          children.push(childNode);
          break;
        default:
          children.push(childNode);
      }
    });

    return {
      navbar,
      toolbar,
      with_tabs,
      children
    };
  }

  _getHTMLid() {
    if (this.props.id === true) {
      return this.props.name;
    }

    return this.props.id;
  }

  _wrapPageContent(elements, with_tabs) {
    if (with_tabs) {
      return elements.children;
    }

    return <div className="page-content">
      {elements.navbar && this.props.navbarType === 'static' ? elements.navbar : undefined}
      {elements.children}
      {elements.toolbar && this.props.toolbarType === 'static' ? elements.toolbar : undefined}
    </div>;
  }

  render() {
    let page_elements = this._getPageElements();

    return <div onClick={this.props.onClick} id={this._getHTMLid()} data-name={this.props.name} className={classNames([this.props.className, 'page'])}>
      {page_elements.navbar && this.props.navbarType === 'fixed' ? page_elements.navbar : undefined}
      {page_elements.toolbar && this.props.toolbarType === 'fixed' ? page_elements.toolbar : undefined}
      {this._wrapPageContent(page_elements, page_elements.with_tabs)}
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
