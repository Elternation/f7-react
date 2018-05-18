import React              from 'react';
import PropTypes          from 'prop-types';
import classNames         from 'classnames';
import Framework7         from 'framework7/dist/framework7.esm.bundle';

import addPropsToChildren from '../../utils/add-props-to-children';

class F7View extends React.Component {
  constructor() {
    super();

    this.html_element = null;
  }

  _getClassNames() {
    let default_classes = [
        this.props.className,
        'view'
      ], calculated_classes, result = [];

    calculated_classes = {
      'view-main': this.props.main,
      'tab'      : this.props.isTab,
    };

    if (this.props.name && !this.props.main) {
      calculated_classes[`view-${this.props.name}`] = true;
    }

    result.push(default_classes, calculated_classes);

    return classNames(result);
  }

  componentDidMount() {
    let result_options = Object.assign({}, this.props.options);

    result_options.name = this.props.main ? 'main' : this.props.name;
    result_options.main = this.props.main;

    this.props.service_props.f7.views.create(this.html_element, result_options);
  }

  render() {
    return <div ref={(el) => { this.html_element = el; }} className={this._getClassNames()}>{addPropsToChildren(this.props.children, { service_props: this.props.service_props })}</div>;
  }
}

F7View.propTypes = {
  children : PropTypes.node.isRequired,
  options  : PropTypes.object,
  className: PropTypes.string,
  main     : PropTypes.bool,
  name     : PropTypes.string,
  isTab    : PropTypes.bool,
  service_props: PropTypes.shape({
    f7: PropTypes.instanceOf(Framework7).isRequired,
  })
};

F7View.defaultProps = {
  main : false,
  isTab: false
};

export default F7View;
