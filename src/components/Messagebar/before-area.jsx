import React                      from 'react';
import PropTypes                  from 'prop-types';

import F7Link                     from '../Link';

import getEventsHandlersFromProps from '../../utils/get-events-handlers-from-props';

class F7MessageBarBeforeTextareaItem extends React.Component {
  render() {
    let event_handlers = getEventsHandlersFromProps(this.props);

    return <F7Link disabled={this.props.disabled} href="#" {...event_handlers}>
      {this.props.children}
    </F7Link>;
  }
}

F7MessageBarBeforeTextareaItem.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
};

export default F7MessageBarBeforeTextareaItem;
