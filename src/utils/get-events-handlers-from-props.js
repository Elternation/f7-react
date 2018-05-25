const getEventsHandlersFromProps = (props) => {
  let event_handlers = {};

  for (let [key, value] of Object.entries(props)) {
    if (key.substring(0,2) !== 'on') {
      continue;
    }

    event_handlers[key] = value;
  }

  return event_handlers;
};

export default getEventsHandlersFromProps;
