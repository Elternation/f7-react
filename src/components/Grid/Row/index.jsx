import React              from 'react';
import PropTypes          from 'prop-types';
import classNames         from 'classnames';

import F7GridCol          from './col';

class F7GridRow extends React.Component {
  _getClassNames() {
    return classNames({
      'row': true,
      'no-gap': this.props.noGap,
    });
  }

  _filteredUnallowedChildren() {
    let result = [];

    React.Children.map(this.props.children, (childNode) => {
      if (childNode.type !== F7GridCol) {
        console.error('In F7Grid.Row children allow only F7Grid.Row.Col, but given: ', childNode.type ? childNode.type : childNode);
      } else {
        result.push(childNode);
      }
    });

    return result;
  }

  render() {
    return <div className={this._getClassNames()}>{this._filteredUnallowedChildren()}</div>;
  }
}

F7GridRow.propTypes = {
  children: PropTypes.node,
  noGap   : PropTypes.bool
};

F7GridRow.Col = F7GridCol;

export default F7GridRow;
