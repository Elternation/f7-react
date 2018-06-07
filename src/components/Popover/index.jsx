import React            from 'react';
import ReactDOM         from 'react-dom';
import PropTypes        from 'prop-types';
import classNames       from 'classnames';
import Framework7       from 'framework7/dist/framework7.esm.bundle';

import withF7AppContext from '../../utils/with-f7-app-context';

class F7Popover extends React.Component {
  constructor() {
    super();

    this.html_element = null;
  }

  _getClassNames() {
    let classes = {
      'popover': true,
    };

    classes[`popover-${this.props.name}`] = true;

    return classNames([this.props.className, classes]);
  }

  render() {
    return ReactDOM.createPortal(<div ref={(el) => { this.html_element = el; }} className={this._getClassNames()}>
      <div className="popover-inner">
        {this.props.children}
      </div>
    </div>, this.props.f7_context.portals.popovers);
  }
}

F7Popover.propTypes = {
  name     : PropTypes.string.isRequired,
  children : PropTypes.node,
  className: PropTypes.string,  f7_context: PropTypes.shape({
    f7     : PropTypes.instanceOf(Framework7).isRequired,
    portals: PropTypes.shape({
      panels  : PropTypes.instanceOf(HTMLElement),
      popovers: PropTypes.instanceOf(HTMLElement),
    }),
  })
};

export default withF7AppContext(F7Popover);
