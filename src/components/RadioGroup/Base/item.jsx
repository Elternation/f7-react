import React                 from 'react';
import PropTypes             from 'prop-types';

import F7ListItemBaseElement from '../../../helpers/components/ListItemBaseElement/index';

class F7BaseRadioGroupItem extends React.Component {
  render() {
    return <F7ListItemBaseElement {...this.props}>
      <label className="item-radio item-content">
        <input type="radio" name={this.props.name} value={this.props.value} checked={this.props.checked}/>
        <i className="icon icon-radio"/>
        <div className="item-inner">
          <div className="item-title">{this.props.children}</div>
        </div>
      </label>
    </F7ListItemBaseElement>;
  }
}

F7BaseRadioGroupItem.propTypes = {
  children: PropTypes.string,
  name    : PropTypes.string.isRequired,
  value   : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  checked : PropTypes.bool,
};

export default F7BaseRadioGroupItem;
