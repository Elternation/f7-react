import React              from 'react';
import PropTypes          from 'prop-types';

class F7BaseListItemTitle extends React.Component {
  render() {
    return <div className="item-title">
      {this.props.children}
    </div>;
  }
}

F7BaseListItemTitle.propTypes = {
  children: PropTypes.node
};

export default F7BaseListItemTitle;
