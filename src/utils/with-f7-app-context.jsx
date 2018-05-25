import React            from 'react';

import { F7AppContext } from '../components/App';

const withF7AppContext = (Component) => {
  return function ComponentWithContext(props) {
    return (
      <F7AppContext.Consumer>
        {(f7_app_context) => {return <Component {...props} f7_context={{ f7: f7_app_context.f7.instance, portals: f7_app_context.portals }} />; }}
      </F7AppContext.Consumer>
    );
  };
};

export default withF7AppContext;
