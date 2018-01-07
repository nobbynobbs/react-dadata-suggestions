import { handleEnter } from "./index"

function handleSpace(e, context) {
  const { selected, showSuggestions } = context.state;
  if (selected !== -1 && showSuggestions) {
    e.preventDefault();
    const { showSuggestions } = context.state;
    if ( showSuggestions ) {
      handleEnter(e, context);
    }
  }
}

export default handleSpace;