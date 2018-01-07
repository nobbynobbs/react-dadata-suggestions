function EscapeHandler(e, context) {
  const KEY_CODE = 27;
  const handle = () => {
    e.preventDefault();
    context.makeListInvisible();
  };
  return {
    KEY_CODE: KEY_CODE,
    handle
  }
}

export default EscapeHandler;