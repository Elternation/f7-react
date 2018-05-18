import React              from 'react';
import PropTypes          from 'prop-types';
import classNames         from 'classnames';

class F7Badge extends React.Component {
  _getClassNames() {
    let class_object = {
      'badge': true,
    };

    if (this.props.color) {
      class_object[`color-${this.props.color}`] = true;
    }

    return classNames(class_object);
  }

  render() {
    return <span className={this._getClassNames()}>{this.props.children}</span>;
  }
}

F7Badge.propTypes = {
  color: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
};

export default F7Badge;
