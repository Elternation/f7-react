import React      from 'react';
import PropTypes  from 'prop-types';
import classNames from 'classnames';
import uuid       from 'uuid/v4';

import F7Tab      from './Tab';
import F7Tabbar   from '../Toolbar';

class F7Tabs extends React.Component {
  _wrapTabs(elements) {
    if (this.props.type === 'static') {
      return elements;
    }

    return <div key="wrapped-tabs" className={classNames({ [`tabs-${this.props.type}-wrap`]: true })}>
      {elements}
    </div>;
  }

  _getElements() {
    let tabs = [], tabbar_buttons = [], idx = 0;

    React.Children.map(this.props.children, (childNode) => {
      if (childNode.type !== F7Tab) {
        console.error('In F7Tabs children allow only F7Tabs.Tab, but given: ', childNode.type ? childNode.type : childNode);
      } else {
        let id = childNode.props.id,
          tab_active = false;

        if (!id) {
          id = uuid();
        }

        if ((typeof this.props.initActive === 'string' && id === this.props.initActive) || (typeof this.props.initActive !== 'string' && idx === 0)) {
          tab_active = true;
        }

        tabbar_buttons.push(
          <F7Tabbar.TabbarButton active={tab_active} key={uuid()}{...childNode.props.tabbarButton} href={`#${id}`}/>
        );

        tabs.push(React.cloneElement(childNode, { id, key: uuid(), className: classNames({ 'tab-active': tab_active }) }));
        idx += 1;
      }
    });

    return {
      tabs,
      tabbar_buttons
    };
  }

  render() {
    let result = [],
      elements = this._getElements();

    result.push(this._wrapTabs(<div key="tabs-content" className={classNames([this.props.className, 'tabs'])}>
      {elements.tabs}
    </div>));

    result.push(<F7Tabbar key="tabbar-for-tabs" isTabbar>
      {elements.tabbar_buttons}
    </F7Tabbar>);

    return result;
  }
}

F7Tabs.Tab = F7Tab;

F7Tabs.defaultProps = {
  type: 'static'
};

F7Tabs.propTypes = {
  initActive  : PropTypes.string,
  children    : PropTypes.node,
  className   : PropTypes.string,
  type        : PropTypes.oneOf([
    'static',
    'animated',
    'swipeable',
  ]),
};

export default F7Tabs;
