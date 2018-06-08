import React                           from 'react';
import PropTypes                       from 'prop-types';
import classNames                      from 'classnames';

import withF7AppContext                from '../../utils/with-f7-app-context';
import getEventsHandlersFromProps      from '../../utils/get-events-handlers-from-props';

import F7MessageBarSheetItem           from './sheet';
import F7MessageBarAttachmentItem      from './attachment';
import F7MessageBarAfterTextareatItem  from './after-area';
import F7MessageBarBeforeTextareatItem from './before-area';

class F7MessageBar extends React.Component {
  constructor() {
    super();

    this.html_element = null;
  }

  _checkChild() {
    let attachments = [], sheets = [], before_items = [], after_items = [];

    React.Children.map(this.props.children, (childNode) => {
      if (!childNode) {
        return;
      }

      switch (childNode.type) {
        case F7MessageBarSheetItem:
          sheets.push(childNode);
          break;
        case F7MessageBarAttachmentItem:
          attachments.push(childNode);
          break;
        case F7MessageBarBeforeTextareatItem:
          before_items.push(childNode);
          break;
        case F7MessageBarAfterTextareatItem:
          after_items.push(childNode);
          break;
        default:
          console.error('In F7MessageBar children allow only F7MessageBar.Sheet, F7MessageBar.Attachment, F7MessageBar.After or F7MessageBar.Before, but given: ', childNode.type ? childNode.type : childNode);
      }
    });

    return {
      attachments,
      sheets,
      before_items,
      after_items,
    };
  }

  _getClassNames() {
    let classes = {
      'toolbar'   : true,
      'messagebar': true,
    };

    return classNames([this.props.className, classes]);
  }

  componentWillUnmount() {
    this.instance.destroy();
  }

  componentDidMount() {
    this.instance = this.props.f7_context.f7.messagebar.create({ el: this.html_element });
  }

  render() {
    let { attachments, sheets, before_items, after_items } = this._checkChild(),
      event_handlers = getEventsHandlersFromProps(this.props);

    return <div ref={(el) => { this.html_element = el; }} className={this._getClassNames()}>
      <div className="toolbar-inner">
        {before_items}
        <div className="messagebar-area">
          {attachments.length ? <div className="messagebar-attachments">{attachments}</div> : null}
          <textarea {...event_handlers} placeholder={this.props.placeholder} value={this.props.value} disabled={this.props.disabled} rows={this.props.rows ? this.props.rows.toString() : undefined} className="resizable"/>
        </div>
        {after_items}
      </div>
      {sheets.length ? <div className="messagebar-sheet">{sheets}</div> : null}
    </div>;
  }
}

F7MessageBar.propTypes = {
  children   : PropTypes.node,
  className  : PropTypes.string,
  placeholder: PropTypes.string,
  f7_context : PropTypes.object,
  value      : PropTypes.string,
  disabled   : PropTypes.bool,
  rows       : PropTypes.number,
};

F7MessageBar = withF7AppContext(F7MessageBar);

F7MessageBar.Sheet      = F7MessageBarSheetItem;
F7MessageBar.Attachment = F7MessageBarAttachmentItem;
F7MessageBar.After      = F7MessageBarAfterTextareatItem;
F7MessageBar.Before     = F7MessageBarBeforeTextareatItem;

export default F7MessageBar;
