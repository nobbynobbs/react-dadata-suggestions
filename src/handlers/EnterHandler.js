function EnterHandler(e, context) {

  const KEY_CODE = 13;

  const handle = () => {
    const {selected} = context.state;
    e.preventDefault();
    if (selected !== -1) {
      context.handleSelect(selected)();
      context.makeListInvisible();
    }
  };

  return {
    KEY_CODE: KEY_CODE,
    handle
  }
}

export default EnterHandler;