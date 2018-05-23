import React                    from 'react';
import classNames               from 'classnames';
import PropTypes                from 'prop-types';
import Framework7               from 'framework7/dist/framework7.esm.bundle';

import withF7AppContext         from '../../utils/with-f7-app-context';

import F7LoginScreenTitle       from './title';
import F7LoginScreenBlockFooter from './block-footer';

class F7LoginScreen extends React.Component {
  constructor() {
    super();

    this.html_element = null;

    this.state = {
      open: false
    };
  }

  _checkChildOrder() {
    let title = null,
      footer = null,
      children = [];

    React.Children.map(this.props.children, (childNode) => {
      switch (childNode.type) {
        case F7LoginScreenTitle:
          title = childNode;
          break;
        case F7LoginScreenBlockFooter:
          footer = childNode;
          break;
        default:
          children.push(childNode);
      }
    });

    return {
      title,
      footer,
      children
    };
  }

  componentDidMount() {
    this.props.f7_context.f7.loginScreen.create({
      el: this.html_element
    });
  }

  UNSAFE_componentWillReceiveProps(new_props) {
    if (new_props.open !== this.state.open) {
      this.setState({ open: new_props.open }, () => {
        if (!new_props.open) {
          this.props.f7_context.f7.loginScreen.close(this.html_element);
        } else {
          this.props.f7_context.f7.loginScreen.open(this.html_element);
        }
      });
    }
  }

  render() {
    let { title, footer, children } = this._checkChildOrder();

    return <div id={this.props.id} ref={(element) => { this.html_element = element; }} className={classNames(['login-screen', this.props.className])}>
      <div className="view">
        <div className="page">
          <div className="page-content login-screen-content">
            {title}
            {children}
            {footer}
          </div>
        </div>
      </div>
    </div>;
  }
}

F7LoginScreen.Title  = F7LoginScreenTitle;
F7LoginScreen.Footer = F7LoginScreenBlockFooter;

F7LoginScreen.propTypes = {
  className : PropTypes.string,
  id        : PropTypes.string,
  children  : PropTypes.node,
  f7_context: PropTypes.shape({
    f7: PropTypes.instanceOf(Framework7).isRequired,
  }),
  open      : PropTypes.bool,
};

export default withF7AppContext(F7LoginScreen);
