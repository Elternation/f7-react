import React              from 'react';
import PropTypes          from 'prop-types';
import classNames         from 'classnames';

import F7ListBaseElement  from '../../../../helpers/components/ListBaseElement';

import Group              from '../../Items/Group';

class F7BaseListView extends React.Component {
  _getClassNames() {
    let classes = {
      'chevron-center'      : this.props.chevronCenter,
      'no-chevron'          : this.props.noChevron
    };

    return classNames([classes, this.props.className]);
  }

  _groupListCheck() {
    let idx = 0,
      is_group = false,
      elements = [];

    React.Children.map(this.props.children, (childNode) => {
      if (!childNode) {
        return;
      }

      if (idx === 0 && childNode.type === Group) {
        is_group = true;
      }

      if (is_group && childNode.type !== Group) {
        console.error('For Group list all children must be type Group, but given: ', childNode.type ? childNode.type : childNode);
      } else if (!is_group && childNode.type === Group) {
        console.error('For non Group list all children must be non Group type!!');
      } else {
        elements.push(childNode);
      }

      idx += 1;
    });

    return {
      is_group,
      elements
    };
  }

  render() {
    let { is_group, elements } = this._groupListCheck(),
      content;

    if (is_group) {
      content = elements;
    } else {
      content = <ul>
        {elements}
      </ul>;
    }

    return <F7ListBaseElement {...this.props} className={this._getClassNames()}>
      {content}
    </F7ListBaseElement>;
  }
}

F7BaseListView.propTypes = {
  children          : PropTypes.node,
  className         : PropTypes.string,
  noHairlines       : PropTypes.bool,
  noHairlinesBetween: PropTypes.bool,
  inset             : PropTypes.bool,
  tabletInset       : PropTypes.bool,
  chevronCenter     : PropTypes.bool,
  noChevron         : PropTypes.bool,
};

export default F7BaseListView;
