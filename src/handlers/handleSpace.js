import { handleEnter } from "./index"

function handleSpace(e, context) {
  const KEY_CODE = 32;
  const handle = () => {
    const {selected, showSuggestions} = context.state;
    if (selected !== -1 && showSuggestions) {
      e.preventDefault();
      const {showSuggestions} = context.state;
      if (showSuggestions) {
        handleEnter(e, context);
      }
    }
  };

  return {
    KEY_CODE: KEY_CODE,
    handle
  }

}

export default handleSpace;