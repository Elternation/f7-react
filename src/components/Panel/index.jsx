import React            from 'react';
import PropTypes        from 'prop-types';
import classNames       from 'classnames';
import Framework7       from 'framework7/dist/framework7.esm.bundle';

import withF7AppContext from '../../utils/with-f7-app-context';

class F7Panel extends React.Component {
  constructor(props) {
    super(props);

    this.html_element = null;
    this.panel_instance = null;

    this.state = {
      open     : false,
      has_error: false,
    };
  }

  _getClassNames() {
    let default_classes = [
        this.props.className,
        'panel'
      ], calculated_classes, result = [];

    calculated_classes = {
      'panel-left'  : this.props.side === 'left',
      'panel-right' : this.props.side === 'right',
      'panel-cover' : this.props.effect === 'cover',
      'panel-reveal': this.props.effect === 'reveal',
    };

    result.push(default_classes, calculated_classes);

    return classNames(result);
  }

  componentDidMount() {
    if (!this.props.f7_context.f7.panel) {
      return;
    }

    this.panel_instance = this.props.f7_context.f7.panel.create({
      el    : this.html_element,
      side  : this.props.side,
      effect: this.props.effect
    });

    if (this.state.open) {
      this.panel_instance.open();
    }
  }

  UNSAFE_componentWillReceiveProps(new_props) {
    if (new_props.open !== this.state.open) {
      this.setState({ open: new_props.open }, () => {
        if (!new_props.open) {
          this.panel_instance.close();
        } else {
          this.panel_instance.open();
        }
      });
    }
  }

  componentWillUnmount() {
    this.panel_instance.destroy();
  }

  render() {
    return <div ref={(el) => { this.html_element = el; }} className={this._getClassNames()}>
      {this.props.children}
    </div>;
  }
}

F7Panel.propTypes = {
  children  : PropTypes.node,
  open      : PropTypes.bool,
  className : PropTypes.string,
  side      : PropTypes.oneOf(['left', 'right']).isRequired,
  effect    : PropTypes.oneOf(['cover', 'reveal']),
  f7_context: PropTypes.shape({
    f7: PropTypes.instanceOf(Framework7).isRequired,
  })
};

F7Panel.defaultProps = {
  open: false,
  effect: 'cover'
};

export default withF7AppContext(F7Panel);
