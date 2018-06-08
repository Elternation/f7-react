import React            from 'react';
import PropTypes        from 'prop-types';

import withF7AppContext from '../../utils/with-f7-app-context';

class F7PhotoBrowser extends React.Component {
  constructor() {
    super();

    this.instance = null;
  }

  _createInstance(parameters) {
    if (this.instance) {
      this.instance.destroy();
    }

    this.instance = this.props.f7_context.f7.photoBrowser.create(parameters);

    this.instance.on('close', this.props.onClose);
  }

  UNSAFE_componentWillReceiveProps(new_props) {
    this._createInstance(new_props);

    if (this.props.opened === false && new_props.opened === true) {
      this.instance.open(new_props.index);
    }

    if (this.props.opened === true && new_props.opened === false) {
      this.instance.close();
    }
  }

  componentDidMount() {
    this._createInstance(this.props);

    if (this.props.opened) {
      this.instance.open(this.props.index);
    }
  }

  componentWillUnmount() {
    this.instance.destroy();
    this.instance = null;
  }

  render() {
    return null;
  }
}

F7PhotoBrowser = withF7AppContext(F7PhotoBrowser);

F7PhotoBrowser.defaultProps = {
  photos: [],
  theme : 'dark',
  backLinkText: ''
};

F7PhotoBrowser.propTypes = {
  photos      : PropTypes.array,
  theme       : PropTypes.oneOf(['light', 'dark']),
  backLinkText: PropTypes.string,
  navbarOfText: PropTypes.string,
  index       : PropTypes.number,
  opened      : PropTypes.bool,
  onClose     : PropTypes.func,
  f7_context  : PropTypes.object,
};

export default F7PhotoBrowser;
