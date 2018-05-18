import React              from 'react';
import PropTypes          from 'prop-types';
import classNames         from 'classnames';

class F7GroupedListGroup extends React.Component {
  _getTitleElement() {
    if (!this.props.title) {
      return;
    }

    return <li className="list-group-title">{this.props.title}</li>;
  }

  render() {
    return <div className={classNames(['list-group', this.props.className])}>
      <ul>
        {this._getTitleElement()}
        {this.props.children}
      </ul>
    </div>;
  }
}

F7GroupedListGroup.propTypes = {
  className: PropTypes.string,
  children : PropTypes.node,
  title    : PropTypes.string,
};

export default F7GroupedListGroup;
