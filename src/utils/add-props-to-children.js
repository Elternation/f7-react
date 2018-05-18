import React from 'react';

const addPropsToChildren = (children, additional_props) => {
  return React.Children.map(children, (child) => {
    return React.cloneElement(child, additional_props);
  });
};

export default addPropsToChildren;
