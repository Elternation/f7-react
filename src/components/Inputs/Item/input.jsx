import React              from 'react';
import PropTypes          from 'prop-types';

import F7RangeSlider      from '../../RangeSlider';

class F7TextInput extends React.Component {
  _getValidateFields() {
    let validate = false,
      pattern = undefined,
      error_message = undefined;

    if (this.props.validate) {
      validate = true;

      if (typeof this.props.validate === 'object') {
        pattern = this.props.validate.pattern;
        error_message = this.props.validate.error_message;
      }
    }

    return {
      validate,
      pattern,
      error_message
    };
  }

  _getPropsForElement() {
    let validate_settings = this._getValidateFields();

    let props = {
      type                : this.props.type,
      required            : this.props.required,
      validate            : (!!(validate_settings.validate || this.props.required)).toString(),
      pattern             : validate_settings.pattern,
      'data-error-message': validate_settings.error_message,
      value               : this.props.value,
    };

    return Object.assign({}, props, this.props.eventsHandlers);
  }

  render() {
    let element_props = this._getPropsForElement();

    switch (this.props.type) {
      case 'select':
        return <select {...element_props}>{this.props.children}</select>;
      case 'textarea':
        return <textarea {...element_props}/>;
      case 'slider':
        return <F7RangeSlider {...this.props}/>;
      default:
        return <input {...element_props}/>;
    }
  }
}

F7TextInput.propTypes = {
  eventsHandlers: PropTypes.object,
  required      : PropTypes.bool,
  validate      : PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      pattern      : PropTypes.string,
      error_message: PropTypes.string,
    })
  ]),
  children: PropTypes.node,
  value   : PropTypes.any,
  type          : PropTypes.oneOf([
    'text',
    'password',
    'email',
    'tel',
    'url',
    'date',
    'number',
    'datetime-local',
    'select',
    'textarea',
    'slider'
  ]),
};

export default F7TextInput;
