import React              from 'react';
import PropTypes          from 'prop-types';
import classNames         from 'classnames';

import F7BlockHeader      from './header';
import F7BlockFooter      from './footer';

class F7Block extends React.Component {
  _getClassNames() {
    let classes = {
      'block'       : true,
      'block-strong': this.props.strong,
      'no-hairlines': this.props.noHairlines,
      'inset'       : this.props.inset,
      'tablet-inset': this.props.tabletInset
    };

    return classNames([classes, this.props.className]);
  }

  _getContentElements() {
    let header = null,
      footer = null,
      elements = [];

    React.Children.map(this.props.children, (childNode) => {
      switch (childNode.type) {
        case F7BlockHeader:
          header = childNode;
          break;
        case F7BlockFooter:
          footer = childNode;
          break;
        default:
          elements.push(childNode);
      }
    });

    return [
      header,
      elements,
      footer,
    ];
  }

  render() {
    return <div className={this._getClassNames()}>
      {this._getContentElements()}
    </div>;
  }
}

F7Block.Header = F7BlockHeader;
F7Block.Footer = F7BlockFooter;

F7Block.defaultProps = {
  strong     : false,
  noHairlines: false,
  inset      : false,
  tabletInset: false,
};

F7Block.propTypes = {
  className  : PropTypes.string,
  children   : PropTypes.node,
  strong     : PropTypes.bool,
  noHairlines: PropTypes.bool,
  inset      : PropTypes.bool,
  tabletInset: PropTypes.bool,
};

export default F7Block;
