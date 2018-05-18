import React              from 'react';
import PropTypes          from 'prop-types';
import classNames         from 'classnames';
import Framework7         from 'framework7/dist/framework7.esm.bundle';

import addPropsToChildren from '../../utils/add-props-to-children';

class F7Views extends React.Component {
  render() {
    return <div className={classNames([this.props.className, 'views'])}>{addPropsToChildren(this.props.children, { service_props: this.props.service_props })}</div>;
  }
}

F7Views.propTypes = {
  children     : PropTypes.node.isRequired,
  className    : PropTypes.string,
  service_props: PropTypes.shape({
    f7: PropTypes.instanceOf(Framework7).isRequired,
  })
};

export default F7Views;
