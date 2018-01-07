function handleArrowUp(e, context){
  e.preventDefault();
  const { selected, suggestions, showSuggestions } = context.state;
  if (!showSuggestions) {
    return;
  }
  const maxSuggestionIndex = suggestions.length - 1;
  const newSelected = selected > 0 ? selected - 1 : maxSuggestionIndex;
  context.selectSuggestion(newSelected);

}

export default handleArrowUp;