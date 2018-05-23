import React            from 'react';

import { F7AppContext } from '../components/App';

const withF7AppContext = (Component) => {
  // ...and returns another component...
  return function ComponentWithContext(props) {
    // ... and renders the wrapped component with the context theme!
    // Notice that we pass through any additional props as well
    return (
      <F7AppContext.Consumer>
        {(f7_app_context) => {return <Component {...props} f7_context={f7_app_context} />; }}
      </F7AppContext.Consumer>
    );
  };
};

export default withF7AppContext;
