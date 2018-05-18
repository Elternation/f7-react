import _                  from 'lodash';
import React              from 'react';
import PropTypes          from 'prop-types';
import Framework7         from 'framework7/dist/framework7.esm.bundle';

import addPropsToChildren from '../../utils/add-props-to-children';

import routerComponent    from './router-component';

class F7App extends React.Component {
  constructor(props) {
    super(props);

    let options = props.parameters;

    this.service_props = { // Забиваем место для дальнейшей передачи пока еще все не инциализировали
      f7: undefined
    };

    this.inited = false;

    options.routes = this._wrapRoutes(props.routes);
    options.init = false;
    options.root = props.root;

    this._onF7Init = this._onF7Init.bind(this);

    this.f7_instance = new Framework7(options);
    this.f7_instance.on('init', this._onF7Init);

    this.f7_instance.init();
  }

  _wrapRoutes(routes) {
    let result = [];

    for (let one_route of routes) {
      if (_.isObject(one_route.component) && one_route.component.element && one_route.component.props) {
        let new_props = Object.assign({}, one_route.component.props, { service_props: this.service_props });

        one_route.component = routerComponent(one_route.component.element, new_props);
      } else {
        one_route.component = routerComponent(one_route.component, { service_props: this.service_props });
      }

      if (_.isArray(one_route.tabs)) {
        one_route.tabs = this._wrapRoutes(one_route.tabs);
      }

      result.push(one_route);
    }

    return result;
  }

  _onF7Init() {
    this.inited = true;

    this.service_props.f7 = this.f7_instance;

    if (!_.isFunction(this.props.onInit)) {
      return;
    }

    this.props.onInit(this.f7_instance);
  }

  render() {
    if (!this.inited) {
      return null;
    }

    return addPropsToChildren(this.props.children, { service_props: this.service_props });
  }
}

F7App.propTypes = {
  parameters: PropTypes.object,
  onInit    : PropTypes.func,
  children  : PropTypes.node.isRequired,
  routes    : PropTypes.array.isRequired,
  root      : PropTypes.string.isRequired
};

export default F7App;
