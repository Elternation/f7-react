import React              from 'react';
import PropTypes          from 'prop-types';
import _                  from 'lodash';

import addPropsToChildren from '../../../../utils/add-props-to-children';

import MediaPath          from './media';
import TitlePath          from './title';
import AfterTitlePath     from './after-title';
import SubtitlePath       from './subtitle';
import TextPath           from './text';

class F7MediaListItem extends React.Component {

  _getFilteredChildren() {
    let media = null,
      title = null,
      after_title = null,
      subtitle = null,
      text = null,
      item_inner;

    React.Children.map(this.props.children, (childNode) => {
      switch (childNode.type) {
        case MediaPath:
          media = addPropsToChildren(childNode, { key: 'item-media' });
          break;
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
          console.error('Element not for Media list item!', childNode.type ? childNode.type : childNode);
      }
    });

    item_inner = <div className="item-inner" key="item-inner">
      <div className="item-title-row">
        {title}
        {after_title}
      </div>
      {subtitle}
      {text}
    </div>;

    if (media) {
      return [
        media,
        item_inner
      ];
    }

    return item_inner;
  }

  _getItemContent() {
    if (!_.isEmpty(this.props.href)) {
      return <a href={this.props.href} className="item-link item-content">
        {this._getFilteredChildren()}
      </a>;
    }

    return <div className="item-content">
      {this._getFilteredChildren()}
    </div>;
  }

  render() {
    return <li>
      {this._getItemContent()}
    </li>;
  }
}

F7MediaListItem.Media      = MediaPath;
F7MediaListItem.Title      = TitlePath;
F7MediaListItem.AfterTitle = AfterTitlePath;
F7MediaListItem.Subtitle   = SubtitlePath;
F7MediaListItem.Text       = TextPath;

F7MediaListItem.propTypes = {
  children: PropTypes.node.isRequired,
  href    : PropTypes.string
};

export default F7MediaListItem;
