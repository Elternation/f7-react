import React              from 'react';
import PropTypes          from 'prop-types';
import classNames         from 'classnames';

import LeftPart           from './left';
import RightPart          from './right';
import TitlePart          from './title';

class F7Navbar extends React.Component {
  _getNavbarClassName() {
    return classNames({
      'navbar'     : true,
      'no-hairline': this.props.noHairline,
      'no-shadow'  : this.props.noShadow,
    });
  }

  _checkChildOrder() {
    let left = <LeftPart/>,
      right = <RightPart/>,
      title = <TitlePart/>;

    React.Children.map(this.props.children, (childNode) => {
      switch (childNode.type) {
        case LeftPart:
          left = childNode;
          break;
        case TitlePart:
          title = childNode;
          break;
        case RightPart:
          right = childNode;
          break;
        default:
          console.error('F7Navbar children only allows Left, Right or Title, but given:', childNode.type ? childNode.type : childNode);
          /* Empty */
      }
    });

    return [
      left,
      title,
      right,
    ];
  }

  render() {
    return <div className={this._getNavbarClassName()}>
      <div className="navbar-inner">
        {this._checkChildOrder()}
      </div>
    </div>;
  }
}

F7Navbar.propTypes = {
  children  : PropTypes.node,
  noHairline: PropTypes.bool,
  noShadow  : PropTypes.bool,
};

F7Navbar.Left = LeftPart;
F7Navbar.Right = RightPart;
F7Navbar.Title = TitlePart;

export default F7Navbar;
