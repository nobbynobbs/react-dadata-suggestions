import { EnterHandler } from "./index"

function TabHandler(e, context) {

  const KEY_CODE = 9;
  const handle = () => {
    const {showSuggestions} = context.state;
    if (showSuggestions) {
      const enterHandler = new EnterHandler(e, context);
      enterHandler.handle();
    }
  };

  return {
    KEY_CODE: KEY_CODE,
    handle
  }
}

export default TabHandler;