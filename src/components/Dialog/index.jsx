import React            from 'react';
import ReactDOM         from 'react-dom';
import PropTypes        from 'prop-types';

import withF7AppContext from '../../utils/with-f7-app-context';

import F7EmptyComponent from '../../helpers/components/Empty';

import { F7AppContext } from '../App';

import F7DialogTitle    from './title';
import F7DialogButton   from './button';

class F7Dialog extends React.Component {
  constructor() {
    super();

    this.instance = null;

    this._onOpen = this._onOpen.bind(this);
    this._onClose = this._onClose.bind(this);
  }

  _getElements() {
    let buttons = [], title = undefined, content = [];

    React.Children.map(this.props.children, (oneChild) => {
      if (!oneChild) {
        return;
      }

      switch (oneChild.type) {
        case F7DialogTitle:
          if (!title) {
            title = oneChild.props.children;
          } else {
            console.error('Only one F7Dialog.Title might be in F7Dialog children!');
          }
          break;
        case F7DialogButton:
          buttons.push(oneChild.props);
          break;
        default:
          content.push(oneChild);
      }
    });

    return {
      buttons,
      title,
      content
    };
  }

  _onOpen(content, event) {
    if (typeof this.props.onOpen === 'function') {
      this.props.onOpen(event);
    }
  }

  _onClose(event) {
    if (typeof this.props.onClose === 'function') {
      this.props.onClose(event);
    }
  }

  _getF7DialogButtons(buttons) {
    let result = [];

    for (let one_button of buttons) {
      result.push({
        text    : one_button.children,
        color   : one_button.color,
        cssClass: one_button.className,
        onClick : one_button.onClick,
        close   : one_button.close,
        bold    : one_button.bold,
      });
    }

    return result.length ? result : undefined;
  }

  UNSAFE_componentWillReceiveProps(new_props) {
    if (this.props.opened === false && new_props.opened === true) {
      this.instance.open();
    }

    if (this.props.opened === true && new_props.opened === false) {
      this.instance.close();
    }
  }

  componentDidMount() {
    let { buttons, title, content } = this._getElements(),
      context = {
        f7: {
          instance: this.props.f7_context.f7
        },
        portals: this.props.f7_context.portals
      };

    this.instance = this.props.f7_context.f7.dialog.create({
      title,
      cssClass       : this.props.className,
      content        : '<div class="dialog-text"></div>',
      verticalButtons: this.props.verticalButtons,
      buttons        : this._getF7DialogButtons(buttons)
    });

    ReactDOM.render(<F7AppContext.Provider value={context}>
      <F7EmptyComponent>
        {content}
      </F7EmptyComponent>
    </F7AppContext.Provider>,this.instance.el.getElementsByClassName('dialog-text')[0]);

    this.instance.on('open', (event) => { this._onOpen(content, event); });
    this.instance.on('close', this._onClose);

    if (this.props.opened) {
      this.instance.open();
    }
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.instance.el.getElementsByClassName('dialog-text')[0]);

    this.instance.destroy();
    this.instance = null;
  }

  render() {
    return null;
  }
}

F7Dialog = withF7AppContext(F7Dialog);

F7Dialog.Button = F7DialogButton;
F7Dialog.Title = F7DialogTitle;

F7Dialog.propTypes = {
  children       : PropTypes.node,
  title          : PropTypes.string,
  className      : PropTypes.string,
  f7_context     : PropTypes.object,
  opened         : PropTypes.bool,
  verticalButtons: PropTypes.bool,
  onOpen         : PropTypes.func,
  onClose        : PropTypes.func,
};

export default F7Dialog;
