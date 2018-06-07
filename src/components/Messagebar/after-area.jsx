import React                      from 'react';
import PropTypes                  from 'prop-types';

import getEventsHandlersFromProps from '../../utils/get-events-handlers-from-props';

class F7MessageBarAfterTextareaItem extends React.Component {
  render() {
    let event_handlers = getEventsHandlersFromProps(this.props);

    return <a className="link" href="#" {...event_handlers}>
      {this.props.children}
    </a>;
  }
}

F7MessageBarAfterTextareaItem.propTypes = {
  children: PropTypes.node,
};

export default F7MessageBarAfterTextareaItem;
