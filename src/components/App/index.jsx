import _                  from 'lodash';
import React              from 'react';
import ReactDOM           from 'react-dom';
import PropTypes          from 'prop-types';
import uuid               from 'uuid/v4';
import Framework7         from 'framework7/dist/framework7.esm.bundle';

const F7Context = React.createContext({
  f7: {
    instance: {}
  },
  portals: {
    panels  : null,
    popovers: null,
  }
});

class F7App extends React.Component {
  constructor(props) {
    super(props);

    let options = props.parameters;

    this.f7_app_context = {
      f7: {
        instance: {}
      },
      portals: {
        panels  : null,
        popovers: null,
      }
    };

    this.state = {
      init: false
    };

    options.routes = this._wrapRoutes(props.routes);
    options.init = false;
    options.root = props.root;

    this._onF7Init = this._onF7Init.bind(this);

    this.f7_app_context.f7.instance = new Framework7(options);
    this.f7_app_context.f7.instance.on('init', this._onF7Init);

    this.f7_app_context.f7.instance.init();
  }

  _wrapRoutes(routes) {
    let result = [];

    for (let one_route of routes) {
      let id = uuid(),
        ReactComponent, props = {};

      if (_.isObject(one_route.react_component) && one_route.react_component.element && one_route.react_component.props) {
        ReactComponent = one_route.react_component.element;
        props = one_route.react_component.props;
      } else {
        ReactComponent = one_route.react_component;
      }

      one_route.content = '<div class="page"></div>';
      one_route.on = {
        pageMounted: (event, page_context) => {
          let el = document.getElementsByClassName('page-next');

          if (!el.length) {
            el = document.getElementsByClassName('page-previous');
          }

          if (!el.length) {
            el = document.getElementsByClassName('page-current');
          }

          el = el[0];

          one_route.el_id = uuid();
          el.setAttribute('id', uuid());

          ReactDOM.render(<F7Context.Provider value={this.f7_app_context}>
            <ReactComponent {...props} page_context={page_context}/>
          </F7Context.Provider>, el);
        },
        pageBeforeRemove: (event) => {
          ReactDOM.unmountComponentAtNode(event.target);
        }
      };

      if (_.isArray(one_route.tabs)) {
        one_route.tabs = this._wrapRoutes(one_route.tabs);
      }

      result.push(one_route);
    }

    return result;
  }

  _onF7Init() {
    if (!_.isFunction(this.props.onInit)) {
      return;
    }

    this.props.onInit(this.f7_app_context.f7.instance);
  }

  componentDidMount() {
    this.setState({
      init: true
    });
  }

  render() {
    if (!this.state.init) {
      return null;
    }

    return <F7Context.Provider value={this.f7_app_context}>
      <div ref={(element) => { this.f7_app_context.portals.panels = element; }} className="f7-react-panels-portal"/>
      <div ref={(element) => { this.f7_app_context.portals.popovers = element; }} className="f7-react-popovers-portal"/>
      {this.props.children}
    </F7Context.Provider>;
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

export { F7Context as F7AppContext };
