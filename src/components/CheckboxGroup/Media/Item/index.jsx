import React              from 'react';
import PropTypes          from 'prop-types';

import F7ListBaseElement  from '../../../../helpers/components/ListItemBaseElement';

import TitlePath          from './title';
import AfterTitlePath     from './after-title';
import SubtitlePath       from './subtitle';
import TextPath           from './text';

class F7MediaCheckboxGroupItem extends React.Component {

  _getFilteredChildren() {
    let title = null,
      after_title = null,
      subtitle = null,
      text = null;

    React.Children.map(this.props.children, (childNode) => {
      if (!childNode) {
        return;
      }

      switch (childNode.type) {
        case TitlePath:
          title = childNode;
          break;
        case AfterTitlePath:
          after_title = childNode;
          break;
        case SubtitlePath:
          subtitle = childNode;
          break;
        case TextPath:
          text = childNode;
          break;
        default:
          console.error('Element not for F7MediaCheckboxGroup item!', childNode.type ? childNode.type : childNode);
      }
    });

    return <label className="item-checkbox item-content">
      <input type="checkbox" checked={this.props.checked}/>
      <i className="icon icon-checkbox"/>
      <div className="item-inner">
        <div className="item-title-row">
          <div className="item-title">{title}</div>
          <div className="item-after">{after_title}</div>
        </div>
        <div className="item-subtitle">{subtitle}</div>
        <div className="item-text">{text}</div>
      </div>
    </label>;
  }

  render() {
    return <F7ListBaseElement {...this.props}>
      {this._getFilteredChildren()}
    </F7ListBaseElement>;
  }
}

F7MediaCheckboxGroupItem.Title      = TitlePath;
F7MediaCheckboxGroupItem.AfterTitle = AfterTitlePath;
F7MediaCheckboxGroupItem.Subtitle   = SubtitlePath;
F7MediaCheckboxGroupItem.Text       = TextPath;

F7MediaCheckboxGroupItem.propTypes = {
  children : PropTypes.node.isRequired,
  href     : PropTypes.string,
  className: PropTypes.string,
  ripple   : PropTypes.bool,
  checked  : PropTypes.bool,
};

export default F7MediaCheckboxGroupItem;
