import React              from 'react';
import PropTypes          from 'prop-types';

import F7GridRow          from './Row';

class F7Grid extends React.Component {
  render() {
    let result = [];

    React.Children.map(this.props.children, (childNode) => {
      if (childNode.type !== F7GridRow) {
        console.error('In F7Grid children allow only F7Grid.Row, but given: ', childNode.type ? childNode.type : childNode);
      } else {
        result.push(childNode);
      }
    });

    return result;
  }
}

F7Grid.propTypes = {
  children: PropTypes.node
};

F7Grid.Row = F7GridRow;

export default F7Grid;
