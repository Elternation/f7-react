import React              from 'react';
import PropTypes          from 'prop-types';
import _                  from 'lodash';
import classNames         from 'classnames';
import Framework7         from 'framework7/dist/framework7.esm.bundle';

import withF7AppContext   from '../../utils/with-f7-app-context';

class F7RangeSlider extends React.Component {
  constructor(props) {
    super(props);

    this.html_element = null;
    this.input_element = undefined;
    this.range_instance = null;
  }

  _getClassNames() {
    let classes = {
      'range-slider': true
    };

    if (typeof this.props.color === 'string') {
      classes[`color-${this.props.color}`] = true;
    }

    return classNames([classes, this.props.className]);
  }

  _getDataAttributes() {
    let attributes = {};

    if (this.props.popupValue) {
      attributes.label = true.toString();
    }

    if (this.props.dual) {
      attributes['data-value-left'] = this.props.leftValue.toString();
      attributes['data-value-right'] = this.props.rightValue.toString();
    }

    return attributes;
  }

  _setNewValue(value) {
    if (!this.props.dual) {
      if (typeof value !== 'number') {
        console.error('New value for non dual F7RangeSlider must be an number, but given: ', value);
        return;
      }
    } else {
      if (!_.isArray(value)) {
        console.error('For dual F7RangeSlider value must be an array with format [leftValue, rightValue], but given: ', value);
        return;
      }

      if (value.length !== 2) {
        console.error('For dual F7RangeSlider value must be an array with format [leftValue, rightValue], but given: ', value);
        return;
      }

      if (typeof value[0] !== 'number' || typeof value[1] !== 'number') {
        console.error('For dual F7RangeSlider left and right value must be a number, but given: ', value);
        return;
      }
    }

    this.range_instance.setValue(value);
  }

  UNSAFE_componentWillReceiveProps(new_props) {
    this._setNewValue(!this.props.dual ? new_props.value : [new_props.leftValue, new_props.rightValue]);
  }

  componentDidMount() {
    let parameters = {
      el     : this.html_element,
      inputEl: this.input_element,
      dual   : this.props.dual,
      step   : this.props.step,
      min    : this.props.min,
      max    : this.props.max,
      label  : this.props.popupValue,
    };

    if (!this.props.dual) {
      parameters.value = this.props.value;
    }

    this.html_element.addEventListener('range:change', (event) => {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(event);
      }
      this._setNewValue(!this.props.dual ? this.props.value : [this.props.leftValue, this.props.rightValue]);
    });

    this.range_instance = this.props.f7_context.f7.range.create(parameters);
  }

  render() {
    return <div {...this._getDataAttributes()} ref={(element) => { this.html_element = element; }} className={this._getClassNames()}>
      <input
        ref={(element) => { this.input_element = element; }}
        type="range"
        min={this.props.min}
        max={this.props.max}
        value={this.props.value}
        onChange={() => { /* Empty function */ }}
        step={this.props.step}
      />
    </div>;
  }
}

F7RangeSlider.defaultProps = {
  dual      : false,
  popupValue: false,
};

F7RangeSlider.propTypes = {
  color     : PropTypes.string,
  className : PropTypes.string,
  min       : PropTypes.number.isRequired,
  max       : PropTypes.number.isRequired,
  value     : function(props, propName, componentName) {
    if (!props.dual) {
      if (typeof props[propName] !== 'number') {
        return new Error(`For non dual ${componentName} ${propName} is required and must be a number!`);
      }

      return;
    }

    if (props[propName] !== undefined) {
      return new Error(`For dual ${componentName} use leftValue and rightValue instead ${propName}!`);
    }
  },
  leftValue : function(props, propName, componentName) {
    if (props.dual) {
      if (typeof props[propName] !== 'number') {
        return new Error(`For dual ${componentName} ${propName} is required and must be a number!`);
      }

      return;
    }

    if (props[propName] !== undefined) {
      return new Error(`For non dual ${componentName} use value instead leftValue and rightValue!`);
    }

  },
  rightValue: function(props, propName, componentName) {
    if (props.dual) {
      if (typeof props[propName] !== 'number') {
        return new Error(`For dual ${componentName} ${propName} is required and must be a number!`);
      }

      return;
    }

    if (props[propName] !== undefined) {
      return new Error(`For non dual ${componentName} use value instead leftValue and rightValue!`);
    }

  },
  step      : PropTypes.number.isRequired,
  dual      : PropTypes.bool,
  popupValue: PropTypes.bool,
  onChange  : PropTypes.func,
  f7_context: PropTypes.shape({
    f7: PropTypes.instanceOf(Framework7).isRequired,
  })

};

export default withF7AppContext(F7RangeSlider);
