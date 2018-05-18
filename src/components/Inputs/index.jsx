import React              from 'react';
import PropTypes          from 'prop-types';
import classNames         from 'classnames';

import addPropsToChildren from '../../utils/add-props-to-children';

import F7InputItem        from './Item';

class F7Inputs extends React.Component {
  _getClassNames() {
    let classes = {
      'list'                : true,
      'inline-labels'       : this.props.inlineLabels,
      'inset'               : this.props.inset,
      'tablet-inset'        : this.props.tabletInset,
    };

    return classNames([classes, this.props.className]);
  }

  _wrapChildren() {
    if (!this.props.floatingLabels) {
      return this.props.children;
    }

    return React.Children.map(this.props.children, (childNode) => {
      return addPropsToChildren(childNode, { floatingLabel: this.props.floatingLabels });
    });
  }

  render() {
    return <div className={this._getClassNames()}>
      <ul>
        {this._wrapChildren()}
      </ul>
    </div>;
  }
}

F7Inputs.Item = F7InputItem;

F7Inputs.propTypes = {
  children      : PropTypes.node,
  className     : PropTypes.string,
  inlineLabels  : PropTypes.bool,
  floatingLabels: PropTypes.bool,
  inset         : PropTypes.bool,
  tabletInset   : PropTypes.bool,
};

export default F7Inputs;
