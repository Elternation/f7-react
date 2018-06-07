import React     from 'react';
import PropTypes from 'prop-types';

class F7MessageBarAttachmentItem extends React.Component {
  render() {
    return <div className="messagebar-attachment">
      <img src={this.props.src}/>
      <span className="messagebar-attachment-delete"/>
      {this.props.deletable ? <span className="messagebar-attachment-delete"/> : null}
    </div>;
  }
}

F7MessageBarAttachmentItem.propTypes = {
  deletable: PropTypes.bool,
  src      : PropTypes.string,
};

export default F7MessageBarAttachmentItem;
