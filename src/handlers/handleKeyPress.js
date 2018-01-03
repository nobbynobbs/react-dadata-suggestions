function handleKeyPress(e) {

  if (e.shiftKey || e.ctrlKey || e.altKey) {
    return;
  }

  const arrowDownKey = 40, arrowUpKey = 38, enterKey = 13, escapeKey = 27, tabKey = 9;

  if ([arrowDownKey, arrowUpKey, enterKey, escapeKey, tabKey].includes(e.which)) {
    e.preventDefault();

    const { selected, suggestions } = this.state;
    const maxSuggestionIndex = suggestions.length - 1;

    if (maxSuggestionIndex === -1) {
      return;
    }

    if (e.which === arrowUpKey) {
      this.setState({
        selected: selected > 0 ? selected - 1 : maxSuggestionIndex
      });
    }
    if (e.which === arrowDownKey) {
      this.setState({
        selected: selected < maxSuggestionIndex ? selected + 1 : 0
      });
    }
    if ((e.which === enterKey || e.which === tabKey) && selected !== -1) {
      this.onSelect(selected)();
    }
    if (e.which === escapeKey) {
      this.makeListInvisible();
    }
  }
}

export default handleKeyPress;