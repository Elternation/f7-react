import React            from 'react';
import PropTypes        from 'prop-types';
import classNames       from 'classnames';
import Framework7       from 'framework7/dist/framework7.esm.bundle';

import withF7AppContext from '../../utils/with-f7-app-context';

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

    this.props.f7_context.f7.views.create(this.html_element, result_options);
  }

  render() {
    return <div ref={(el) => { this.html_element = el; }} className={this._getClassNames()}>
      {this.props.children}
    </div>;
  }
}

F7View.propTypes = {
  children  : PropTypes.node.isRequired,
  options   : PropTypes.object,
  className : PropTypes.string,
  main      : PropTypes.bool,
  name      : PropTypes.string,
  isTab     : PropTypes.bool,
  f7_context: PropTypes.shape({
    f7: PropTypes.instanceOf(Framework7).isRequired,
  })
};

F7View.defaultProps = {
  main : false,
  isTab: false
};

export default withF7AppContext(F7View);
