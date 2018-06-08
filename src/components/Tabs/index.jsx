import React          from 'react';
import PropTypes      from 'prop-types';
import classNames     from 'classnames';
import _              from 'lodash';
import uuid           from 'uuid/v4';

import F7Tab          from './Tab';
import F7Tabbar       from '../Toolbar';
import F7EmptyElement from '../../helpers/components/Empty';

class F7Tabs extends React.Component {
  constructor() {
    super();

    this.state = {
      tabs          : {},
      tabbar_buttons: [],
      no_show       : false,
    };
  }

  _calculateButtons(tabs, active_idx) {
    let idx = 0, result = [], keys = _.keys(this.state.tabs);

    for (let [key, one_tab] of Object.entries(tabs)) {
      if (keys[idx]) {
        key = keys[idx];
      }

      result.push(<F7Tabbar.TabbarButton key={key} active={typeof active_idx === 'number' ? idx === active_idx : undefined} {...one_tab.props.tabbarButton} href={`#${one_tab.props.id}`}/>);
      idx += 1;
    }

    return result;
  }

  _filterChildren(children) {
    let filtered = [];

    React.Children.map(children, (one_children) => {
      if (!one_children) {
        return;
      }

      if (one_children.type !== F7Tab) {
        return console.error('In F7Tabs children allow only F7Tabs.Tab, but given: ', one_children.type ? one_children.type : one_children);
      }

      filtered.push(one_children);
    });

    return filtered;
  }

  UNSAFE_componentWillReceiveProps(new_props) {
    this.setState({
      tabbar_buttons: this._calculateButtons(this._filterChildren(new_props.children))
    });
  }

  componentDidMount() {
    let tabs = {}, idx = 0, active_idx = 0;

    React.Children.map(this._filterChildren(this.props.children), (childNode) => {
      let id, key, tab_active;

      id = childNode.props.id;
      tab_active = false;

      if (typeof id !== 'string') {
        id = uuid();
      }

      if ((typeof this.props.initActive === 'string' && id === this.props.initActive) || (typeof this.props.initActive !== 'string' && idx === 0)) {
        tab_active = true;
        active_idx = idx;
      }

      key = uuid();

      tabs[key] = React.cloneElement(childNode, { id, key, className: classNames({ 'tab-active': tab_active }) });
      idx += 1;

    });

    this.setState({
      tabs,
      tabbar_buttons: this._calculateButtons(tabs, active_idx)
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
    return <F7EmptyElement>
      {this._wrapTabs(<div className={classNames([this.props.className, 'tabs'])}>{_.values(this.state.tabs)}</div>)}
      <F7Tabbar isTabbar>{this.state.tabbar_buttons}</F7Tabbar>
    </F7EmptyElement>;
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
