import React            from 'react';
import PropTypes        from 'prop-types';

import withF7AppContext from '../../utils/with-f7-app-context';
import Group            from './group';
import Button           from './button';

class F7ActionSheet extends React.Component {
  _generateButtonObject() {
    let result = [], idx = 0,
      is_group = false,
      elements = [];

    React.Children.map(this.props.children, (childNode) => {
      if (!childNode) {
        return;
      }

      if (idx === 0 && childNode.type === Group) {
        is_group = true;
      }

      switch (childNode.type) {
        case Group:
          if (!is_group) {
            console.error('For non Group ActionSheet all children must be non Group type!!');
          } else {
            elements.push(childNode);
          }
          break;
        case Button:
          if (is_group) {
            console.error('For Group ActionSheet all children must be type Group');
          } else {
            elements.push(childNode);
          }
          break;
        default:
          console.error('In F7ActionSheet children allow only F7ActionSheet.Group, or F7ActionSheet.Button, but given: ', childNode.type ? childNode.type : childNode);
      }

      idx += 1;
    });

    if (is_group) {
      let result_length;

      for (let one_group of elements) {
        let to_push = [];

        if (typeof one_group.props.label === 'string') {
          to_push = [{
            text : one_group.props.label,
            label: true,
          }];
        }

        result_length = result.push(to_push);

        React.Children.map(one_group.props.children, (one_button) => {
          if (!one_button && one_button.type !== Button) {
            console.error('In F7ActionSheet.Group children allow only F7ActionSheet.Button, but given: ', one_button.type ? one_button.type : one_button);
          } else {
            result[result_length - 1].push(this._getOneButtonParams(one_button.props));
          }
        });
      }
    } else {
      for (let one_button of elements) {
        result.push(this._getOneButtonParams(one_button.props));
      }
    }

    return result;
  }

  _getOneButtonParams(button_props) {
    return {
      text    : button_props.children,
      onClick : button_props.onClick,
      bold    : button_props.bold,
      color   : button_props.color,
      close   : button_props.close,
      disabled: button_props.disabled,
      bg      : button_props.bg,
    };
  }

  UNSAFE_componentWillReceiveProps(new_props) {
    if (this.props.opened === false && new_props.opened === true) {
      this.instance.open();
    }

    if (this.props.opened === true && new_props.opened === false) {
      this.instance.close();
    }
  }

  componentWillUnmount() {
    this.instance.destroy();
  }

  componentDidMount() {
    this.instance = this.props.f7_context.f7.actions.create({ buttons: this._generateButtonObject() });

    this.instance.on('closed', (event) => {
      if (typeof this.props.onActionsClosed === 'function') {
        this.props.onActionsClosed(event);
      }
    });
  }

  render() {
    return null;
  }
}

F7ActionSheet.propTypes = {
  children       : PropTypes.node,
  opened         : PropTypes.bool,
  f7_context     : PropTypes.object.isRequired,
  onActionsClosed: PropTypes.func,
};

F7ActionSheet = withF7AppContext(F7ActionSheet);

F7ActionSheet.Group = Group;
F7ActionSheet.Button = Button;

export default F7ActionSheet;