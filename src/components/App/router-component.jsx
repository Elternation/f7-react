import ReactDOM from 'react-dom';
import React    from 'react';

class F7RouterComponentClass {
  constructor(ReactComponent, props = {}) {
    this.HTMLElementRoot = document.createElement('div');
    this.ReactComponent = ReactComponent;
    this.props = props;
  }

  createReactElement(callback = () => { /* Empty function */ }) {
    let ReactComponent = this.ReactComponent;

    ReactDOM.render(<ReactComponent {...this.props}/>, this.HTMLElementRoot, callback);
  }

  render() {
    return this.HTMLElementRoot.childNodes[0];
  }
}

const getRouterComponent = (reactComponent, props = {}) => {
  return {
    render: () => {
      let instance = new F7RouterComponentClass(reactComponent, props),
        htmlReactElement = null,
        all_done = false;

      instance.createReactElement(() => {
        htmlReactElement = instance.render();
        all_done = true;
      });

      while (!all_done) { /* Empty loop */ }

      return htmlReactElement;
    }
  };
};

export default getRouterComponent;
