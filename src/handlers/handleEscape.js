function handleEscape(e, context) {
  e.preventDefault();
  context.makeListInvisible();
}

export default handleEscape;