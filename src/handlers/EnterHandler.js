function EnterHandler(e, context) {

  const KEY_CODE = 13;

  const handle = () => {
    const { selected, suggestions } = context.state;
    e.preventDefault();
    if (selected !== -1) {
      context.handleSelect(selected)();
      context.makeListInvisible();
    } else if (!!suggestions.length) {
      const { query } = context.state;
      const trimmedQuery = query.trim();
      const index = suggestions.findIndex(({value}) => {
        return value === trimmedQuery;
      });
      if (index !== -1) {
        context.handleSelect(index)();
        context.makeListInvisible();
      }
    }
  };

  return {
    KEY_CODE: KEY_CODE,
    handle
  }
}

export default EnterHandler;