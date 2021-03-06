import React              from 'react';
import PropTypes          from 'prop-types';

class F7MediaListItemSubtitle extends React.Component {
  render() {
    return <div className="item-subtitle">
      {this.props.children}
    </div>;
  }
}

F7MediaListItemSubtitle.propTypes = {
  children: PropTypes.node
};

export default F7MediaListItemSubtitle;
