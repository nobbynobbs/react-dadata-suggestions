import { handleEnter } from "./index"

function handleTab(e, context) {
  const { showSuggestions } = context.state;
  if ( showSuggestions ) {
    handleEnter(e, context);
  }
}

export default handleTab;