import React     from 'react';
import PropTypes from 'prop-types';

class F7MessageBarSheetItem extends React.Component {
  render() {
    if (this.props.custom) {
      return <div className="messagebar-sheet-item">
        {this.props.children}
      </div>;
    }

    return <label className="checkbox messagebar-sheet-image" style={{ backgroundImage: `url(${this.props.src})` }}>
      <input type="checkbox"/>
      <i className="icon icon-checkbox"/>
    </label>;
  }
}

F7MessageBarSheetItem.propTypes = {
  children: PropTypes.node,
  custom  : PropTypes.bool,
  src     : PropTypes.string,
};

export default F7MessageBarSheetItem;
