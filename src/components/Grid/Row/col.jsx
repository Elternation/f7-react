import React              from 'react';
import PropTypes          from 'prop-types';
import classNames         from 'classnames';

const CLASS_NAME_PREFIX = {
  phone  : 'col',
  tablet : 'tablet',
  desktop: 'desktop',
};

const CLASS_NAME_POSTFIX_AUTO_WIDTH = {
  phone  : '',
  tablet : '-auto',
  desktop: '-auto',
};

class F7GridCol extends React.Component {
  _getClassNames() {
    let classObjects = {
      'col': this.props.phone === 'auto',
    };

    for (let one_type of ['phone', 'tablet', 'desktop']) {
      if (!this.props[one_type]) {
        continue;
      }

      if (!this._checkWidth(this.props[one_type])) {
        return;
      }

      if (this.props[one_type] === 'auto') {
        classObjects[`${CLASS_NAME_PREFIX[one_type]}${CLASS_NAME_POSTFIX_AUTO_WIDTH[one_type]}`] = true;
      } else {
        classObjects[`${CLASS_NAME_PREFIX[one_type]}-${this.props[one_type]}`] = true;
      }
    }

    return classNames(classObjects);
  }

  _checkWidth(width) {
    if (width === 'auto') {
      return true;
    }

    if (width <= 0 || width > 100 || width % 5 !== 0) {
      console.error('Width of F7Grid.Col must be in range 0..100 and multiple of 5 or equal string "auto", but given: ', width);
      return false;
    }

    return true;
  }

  render() {
    return <div className={this._getClassNames()}>{this.props.children}</div>;
  }
}

F7GridCol.defaultProps = {
  phone: 'auto'
};

F7GridCol.propTypes = {
  children: PropTypes.node,
  phone   : PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['auto'])
  ]),
  tablet  : PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['auto'])
  ]),
  desktop : PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['auto'])
  ]),
};

export default F7GridCol;
