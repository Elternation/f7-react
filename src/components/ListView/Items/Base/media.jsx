import React              from 'react';
import PropTypes          from 'prop-types';

class F7BaseListItemMedia extends React.Component {
  render() {
    return <div className="item-media">
      {this.props.children}
    </div>;
  }
}

F7BaseListItemMedia.propTypes = {
  children: PropTypes.node
};

export default F7BaseListItemMedia;
