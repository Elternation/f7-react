import React                 from 'react';
import PropTypes             from 'prop-types';

import F7ListItemBaseElement from '../../../helpers/components/ListItemBaseElement';

class F7BaseCheckboxGroupItem extends React.Component {
  render() {
    return <F7ListItemBaseElement {...this.props}>
      <label className="item-checkbox item-content">
        <input type="checkbox" checked={this.props.checked}/>
        <i className="icon icon-checkbox"/>
        <div className="item-inner">
          <div className="item-title">{this.props.children}</div>
        </div>
      </label>
    </F7ListItemBaseElement>;
  }
}

F7BaseCheckboxGroupItem.propTypes = {
  children: PropTypes.string,
  checked : PropTypes.bool,
};

export default F7BaseCheckboxGroupItem;
