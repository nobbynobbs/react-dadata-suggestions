function handleEnter(e, context) {
  const { selected } = context.state;
  e.preventDefault();
  if (selected !== -1) {
    context.handleSelect(selected)();
    context.makeListInvisible();
  }
}

export default handleEnter;