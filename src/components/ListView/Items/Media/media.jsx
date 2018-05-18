import React              from 'react';
import PropTypes          from 'prop-types';

class F7MediaListItemMedia extends React.Component {
  render() {
    return <div className="item-media">
      {this.props.children}
    </div>;
  }
}

F7MediaListItemMedia.propTypes = {
  children: PropTypes.node
};

export default F7MediaListItemMedia;
