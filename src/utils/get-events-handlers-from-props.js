const getEventsHandlersFromProps = (props) => {
  let event_handlers = {};

  for (let [key, value] of Object.entries(props)) {
    if (/^on[A-Z]\w+$/.test(key)) {
      event_handlers[key] = value;
    }
  }

  return event_handlers;
};

export default getEventsHandlersFromProps;
