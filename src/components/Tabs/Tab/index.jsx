import React      from 'react';
import PropTypes  from 'prop-types';
import classNames from 'classnames';

class F7Tab extends React.Component {
  _getClassNames() {
    let result = {
      'tab'         : true,
      'page-content': true,
    };

    if (typeof this.props.className === 'string') {
      result[this.props.className] = true;
    }

    return classNames(result);
  }

  render() {
    return <div id={this.props.id} className={this._getClassNames()}>
      {this.props.children}
    </div>;
  }
}

F7Tab.propTypes = {
  id          : PropTypes.string,
  children    : PropTypes.node,
  className   : PropTypes.string,
  tabbarButton: PropTypes.shape({
    icon      : PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    iconColor : PropTypes.string,
    label     : PropTypes.string,
    badge     : PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    badgeColor: PropTypes.string
  }),
};

export default F7Tab;
