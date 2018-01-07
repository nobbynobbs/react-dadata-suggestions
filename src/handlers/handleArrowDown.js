function handleArrowDown(e, context){
  e.preventDefault();
  const { selected, suggestions, showSuggestions } = context.state;

  if (!showSuggestions && !!suggestions.length) {
    context.makeListVisible();
    return;
  }

  if (!showSuggestions) {
    return;
  }

  const maxSuggestionIndex = suggestions.length - 1;
  const newSelected = selected < maxSuggestionIndex ? selected + 1 : 0;
  context.selectSuggestion(newSelected);
}

export default handleArrowDown;