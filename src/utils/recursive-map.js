import React from 'react';
import _     from 'lodash';

const recursiveMap = (children, fn) => {
  let result;

  result = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    if (child.props.children) {
      child = React.cloneElement(child, {
        children: recursiveMap(child.props.children, fn)
      });
    }

    return fn(child);
  });

  if (!_.isArray(children) && result.length === 1) {
    return result[0];
  }

  return result;
};

export default recursiveMap;
