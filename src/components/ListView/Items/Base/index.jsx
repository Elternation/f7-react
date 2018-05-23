import React              from 'react';
import PropTypes          from 'prop-types';
import _                  from 'lodash';
import classNames         from 'classnames';

import addPropsToChildren from '../../../../utils/add-props-to-children';

import MediaPath          from './media';
import TitlePath          from './title';
import AfterTitlePath     from './after-title';
import HeaderPath         from './header';
import FooterPath         from './footer';

class F7BaseListItem extends React.Component {

  _getFilteredChildren() {
    let media = null,
      title = null,
      after_title = null,
      header = null,
      footer = null,
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
        case HeaderPath:
          header = childNode;
          break;
        case FooterPath:
          footer = childNode;
          break;
        default:
          console.error('Element not for list item!', childNode.type ? childNode.type : childNode);
      }
    });

    item_inner = <div className="item-inner" key="item-inner">
      <div className="item-title">
        {header}
        {title.props.children}
        {footer}
      </div>
      {after_title}
    </div>;

    if (media) {
      return [
        media,
        item_inner
      ];
    }

    return item_inner;
  }

  _getEventHandlers() {
    let event_handlers = {};

    for (let [key, value] of Object.entries(this.props)) {
      if (key.substring(0,2) !== 'on') {
        continue;
      }

      event_handlers[key] = value;
    }

    return event_handlers;
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
    let events_handlers = this._getEventHandlers();

    return <li {...events_handlers} className={classNames([this.props.className, { ripple: this.props.ripple }])}>
      {this._getItemContent()}
    </li>;
  }
}

F7BaseListItem.Media      = MediaPath;
F7BaseListItem.Title      = TitlePath;
F7BaseListItem.AfterTitle = AfterTitlePath;
F7BaseListItem.Header     = HeaderPath;
F7BaseListItem.Footer     = FooterPath;

F7BaseListItem.propTypes = {
  children : PropTypes.node.isRequired,
  href     : PropTypes.string,
  className: PropTypes.string,
  ripple   : PropTypes.bool,
};

export default F7BaseListItem;
