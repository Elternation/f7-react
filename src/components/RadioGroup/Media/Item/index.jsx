import React              from 'react';
import PropTypes          from 'prop-types';

import F7ListBaseElement  from '../../../../helpers/components/ListItemBaseElement';

import TitlePath          from './title';
import AfterTitlePath     from './after-title';
import SubtitlePath       from './subtitle';
import TextPath           from './text';

class F7MediaRadioGroupItem extends React.Component {

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
          console.error('Element not for F7MediaRadioGroup item!', childNode.type ? childNode.type : childNode);
      }
    });

    return <label className="item-radio item-content">
      <input type="radio" name={this.props.name} value={this.props.value} checked={this.props.checked}/>
      <i className="icon icon-radio"/>
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

F7MediaRadioGroupItem.Title      = TitlePath;
F7MediaRadioGroupItem.AfterTitle = AfterTitlePath;
F7MediaRadioGroupItem.Subtitle   = SubtitlePath;
F7MediaRadioGroupItem.Text       = TextPath;

F7MediaRadioGroupItem.propTypes = {
  children : PropTypes.node.isRequired,
  href     : PropTypes.string,
  className: PropTypes.string,
  ripple   : PropTypes.bool,
  name     : PropTypes.string.isRequired,
  value    : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  checked  : PropTypes.bool,
};

export default F7MediaRadioGroupItem;
