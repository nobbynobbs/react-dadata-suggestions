import { EnterHandler } from "./index"

function SpaceHandler(e, context) {
  const KEY_CODE = 32;
  const handle = () => {
    const {selected, showSuggestions} = context.state;
    if (selected !== -1 && showSuggestions) {
      e.preventDefault();
      const {showSuggestions} = context.state;
      if (showSuggestions) {
        const enterHandler = new EnterHandler(e, context);
        enterHandler.handle();
      }
    }
  };

  return {
    KEY_CODE: KEY_CODE,
    handle
  }

}

export default SpaceHandler;