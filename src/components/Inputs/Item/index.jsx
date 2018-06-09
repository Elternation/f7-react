import React             from 'react';
import PropTypes         from 'prop-types';
import classNames        from 'classnames';
import _                 from 'lodash';

import F7ListBaseElement from '../../../helpers/components/ListItemBaseElement';

import F7InputsItemInput from './input';

class F7BaseInputsItem extends React.Component {
  _getClassNames() {
    let classes = {
      'item-content'        : true,
      'item-input'          : true,
      'item-input-with-info': !_.isEmpty(this.props.info)
    };

    return classNames([classes, this.props.className]);
  }

  _getContent() {
    let media, label, input, info;

    if (this.props.media) {
      media = <div className="item-media">{this.props.media}</div>;
    }

    if (!_.isEmpty(this.props.label)) {
      label = <div className={classNames({'item-title': true, 'item-floating-label': this.props.floatingLabel, 'item-label': !this.props.floatingLabel })}>
        {this.props.label}
      </div>;
    }

    input = <F7InputsItemInput {...this.props}/>;

    if (!_.isEmpty(this.props.info)){
      info = <div className="item-input-info">{this.props.info}</div>;
    }

    return {
      media,
      label,
      input,
      info
    };
  }

  render() {
    let elements = this._getContent();

    return <F7ListBaseElement {...this.props} className={this._getClassNames()}>
      {elements.media}
      <div className="item-inner">
        {elements.label}
        <div className={classNames(['item-input-wrap', { disabled: this.props.disabled }])}>
          {elements.input}
          {elements.info}
        </div>
      </div>
    </F7ListBaseElement>;
  }
}

F7BaseInputsItem.defaultProps = {
  type         : 'text',
  floatingLabel: false,
};

F7BaseInputsItem.propTypes = {
  className    : PropTypes.string,
  media        : PropTypes.node,
  label        : PropTypes.string,
  type         : PropTypes.string.isRequired,
  info         : PropTypes.string,
  floatingLabel: PropTypes.bool,
  disabled     : PropTypes.bool,

};

export default F7BaseInputsItem;
