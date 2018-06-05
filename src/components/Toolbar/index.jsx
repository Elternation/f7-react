import React              from 'react';
import PropTypes          from 'prop-types';
import classNames         from 'classnames';

import F7TabbarButton     from './tab-button';

class F7Toolbar extends React.Component {
  _getToolbarClassName() {
    return classNames({
      'toolbar'          : true,
      'tabbar'           : this.props.isTabbar,
      'tabbar-labels'    : this._checkTabbarLabel(),
      'no-hairline'      : this.props.noHairline,
      'no-shadow'        : this.props.noShadow,
      'tabbar-scrollable': this.props.isTabbar && this.props.scrollable,
      'toolbar-bottom-md': !this.props.onTopMD
    });
  }

  _checkTabbarLabel() {
    let is_tabbar_label = false;

    // @TODO Elternation не очень оптимизировано. Надо останавливаться на первом нахождении
    React.Children.map(this.props.children, (childNode) => {
      if (childNode.type === F7TabbarButton) {
        if (typeof childNode.props.children === 'string') {
          is_tabbar_label = true;
        }
      }
    });

    return is_tabbar_label;
  }

  render() {
    return <div className={this._getToolbarClassName()}>
      <div className="toolbar-inner">
        {this.props.children}
      </div>
    </div>;
  }
}

F7Toolbar.TabbarButton = F7TabbarButton;

F7Toolbar.defaultProps = {
  isTabbar  : false,
  onTopMD   : false,
  scrollable: false,
};

F7Toolbar.propTypes = {
  children  : PropTypes.node,
  isTabbar  : PropTypes.bool,
  noHairline: PropTypes.bool,
  noShadow  : PropTypes.bool,
  scrollable: PropTypes.bool,
  onTopMD   : PropTypes.bool,
};

export default F7Toolbar;
