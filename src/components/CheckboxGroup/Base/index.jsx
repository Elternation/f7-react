import React             from 'react';
import PropTypes         from 'prop-types';

import F7ListBaseElement from '../../../helpers/components/ListBaseElement/index';

import Item              from './item';

class F7BaseCheckboxGroup extends React.Component {
  _filterChildren() {
    let children = [];

    React.Children.map(this.props.children, (one_children) => {
      if (!one_children) {
        return;
      }

      if (one_children.type !== Item) {
        return console.error('In F7CheckboxGroup children allow only F7CheckboxGroup.Item, but given: ', one_children.type ? one_children.type : one_children);
      }

      children.push(one_children);
    });

    return children;
  }

  render() {
    return <F7ListBaseElement {...this.props}>
      <ul>
        {this._filterChildren()}
      </ul>
    </F7ListBaseElement>;
  }
}

F7BaseCheckboxGroup.Item = Item;

F7BaseCheckboxGroup.propTypes = {
  children: PropTypes.node,
};

export default F7BaseCheckboxGroup;
