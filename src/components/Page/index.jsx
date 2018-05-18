import React              from 'react';
import PropTypes          from 'prop-types';
import classNames         from 'classnames';
import Framework7         from 'framework7/dist/framework7.esm.bundle';

import Navbar             from '../Navbar';
import Toolbar            from '../Toolbar';

import recursiveMap       from '../../utils/recursive-map';

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

  _addServicePropsToChilder(children) {
    return recursiveMap(children, (one_children) => {
      return React.cloneElement(one_children, { service_props: this.props.service_props });
    });
  }

  render() {
    let { navbar, toolbar, children } = this._checkChildOrder();

    return <div onClick={this.props.onClick} data-name={this.props.name} className={classNames([this.props.className, 'page'])}>
      {navbar && this.props.navbarType === 'fixed' ? navbar : undefined}
      {toolbar && this.props.toolbarType === 'fixed' ? toolbar : undefined}
      <div className="page-content">
        {navbar && this.props.navbarType === 'static' ? navbar : undefined}
        {this._addServicePropsToChilder(children)}
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
  children     : PropTypes.node,
  navbarType   : PropTypes.oneOf([
    'static',
    'fixed'
  ]),
  toolbarType  : PropTypes.oneOf([
    'static',
    'fixed'
  ]),
  className    : PropTypes.string,
  name         : PropTypes.string.isRequired,
  onClick      : PropTypes.func,
  onInit       : PropTypes.func,
  service_props: PropTypes.shape({
    f7: PropTypes.instanceOf(Framework7).isRequired,
  })

};

export default F7Page;
