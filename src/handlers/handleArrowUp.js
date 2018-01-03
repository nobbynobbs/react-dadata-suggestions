function handleArrowUp(e, context){
  e.preventDefault();
  const { selected, suggestions, showSuggestions } = context.state;
  if (!showSuggestions) {
    return;
  }
  const maxSuggestionIndex = suggestions.length - 1;
  context.setState({
    selected: selected > 0 ? selected - 1 : maxSuggestionIndex
  });
}

export default handleArrowUp;