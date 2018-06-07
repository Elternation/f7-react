import React      from 'react';
import PropTypes  from 'prop-types';
import classNames from 'classnames';
import uuid       from 'uuid/v4';

import F7Tab      from './Tab';
import F7Tabbar   from '../Toolbar';

class F7Tabs extends React.Component {
  constructor() {
    super();

    this.state = {
      tabs          : [],
      tabbar_buttons: []
    };
  }

  componentDidMount() {
    let tabs = [], tabbar_buttons = [], idx = 0;

    React.Children.map(this.props.children, (childNode) => {
      let id, tab_active;

      if (!childNode) {
        return;
      }

      switch (childNode.type) {
        case F7Tab:
          id = childNode.props.id;
          tab_active = false;

          if (!id) {
            id = uuid();
          }

          if ((typeof this.props.initActive === 'string' && id === this.props.initActive) || (typeof this.props.initActive !== 'string' && idx === 0)) {
            tab_active = true;
          }

          tabbar_buttons.push(
            <F7Tabbar.TabbarButton active={tab_active} key={uuid()} {...childNode.props.tabbarButton} href={`#${id}`}/>
          );

          tabs.push(React.cloneElement(childNode, { id, key: uuid(), className: classNames({ 'tab-active': tab_active }) }));
          idx += 1;
          break;
        default:
          console.error('In F7Tabs children allow only F7Tabs.Tab, but given: ', childNode.type ? childNode.type : childNode);
      }
    });

    this.setState({
      tabs,
      tabbar_buttons
    });
  }

  _wrapTabs(elements) {
    if (this.props.type === 'static') {
      return elements;
    }

    return <div key="wrapped-tabs" className={classNames({ [`tabs-${this.props.type}-wrap`]: true })}>
      {elements}
    </div>;
  }

  render() {
    let result = [];

    result.push(this._wrapTabs(<div key="tabs-content" className={classNames([this.props.className, 'tabs'])}>
      {this.state.tabs}
    </div>));

    result.push(<F7Tabbar key="tabbar-for-tabs" isTabbar>
      {this.state.tabbar_buttons}
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
