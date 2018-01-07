function ArrowUpHandler(e, context) {
  const KEY_CODE = 38;
  const handle = () => {
    e.preventDefault();
    const {selected, suggestions, showSuggestions} = context.state;
    if (!showSuggestions) {
      return;
    }
    const maxSuggestionIndex = suggestions.length - 1;
    const newSelected = selected > 0 ? selected - 1 : maxSuggestionIndex;
    context.selectSuggestion(newSelected);
  };

  return {
    KEY_CODE: KEY_CODE,
    handle
  }
}

export default ArrowUpHandler;