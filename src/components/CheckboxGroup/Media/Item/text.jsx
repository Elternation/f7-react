import React              from 'react';
import PropTypes          from 'prop-types';

class F7MediaCheckboxGroupItemText extends React.Component {
  render() {
    return <div className="item-text">
      {this.props.children}
    </div>;
  }
}

F7MediaCheckboxGroupItemText.propTypes = {
  children: PropTypes.node
};

export default F7MediaCheckboxGroupItemText;
