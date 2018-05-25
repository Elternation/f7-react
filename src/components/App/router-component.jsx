import ReactDOM from 'react-dom';
import React    from 'react';

class F7RouterComponentClass {
  constructor(ReactComponent, props = {}) {
    this.HTMLElementRoot = document.createElement('div');
    this.ReactComponent = ReactComponent;
    this.props = props;
  }

  createReactElement(F7Context, context, callback = () => { /* Empty function */ }) {
    let ReactComponent = this.ReactComponent;

    ReactDOM.render(
      <F7Context.Provider value={context}>
        <ReactComponent {...this.props}/>
      </F7Context.Provider>,
      this.HTMLElementRoot, callback);
  }

  render() {
    return this.HTMLElementRoot.childNodes[0];
  }
}

const getRouterComponent = (reactComponent, F7Context, context, props = {}) => {
  return {
    render: () => {
      let instance = new F7RouterComponentClass(reactComponent, props),
        htmlReactElement = null,
        all_done = false;

      instance.createReactElement(F7Context, context, () => {
        htmlReactElement = instance.render();
        all_done = true;
      });

      while (!all_done) { /* Empty loop */ }

      return htmlReactElement;
    }
  };
};

export default getRouterComponent;
