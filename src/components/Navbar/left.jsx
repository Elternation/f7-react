import React              from 'react';
import PropTypes          from 'prop-types';

class F7NavbarLeft extends React.Component {
  _getBackLink() {
    if (!this.props.backLink) {
      return;
    }

    let text;

    if (typeof this.props.backLink === 'string') {
      text = <span>{this.props.backLink}</span>;
    }

    return <a className="link back">
      <i className="icon icon-back"/>
      {text}
    </a>;
  }

  render() {
    return <div className="left">
      {this._getBackLink()}
      {this.props.children}
    </div>;
  }
}

F7NavbarLeft.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]),
  backLink: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ])
};

export default F7NavbarLeft;
