import {
  EnterHandler,
  TabHandler,
  EscapeHandler,
  ArrowUpHandler,
  ArrowDownHandler,
  SpaceHandler,
} from "./index";

function handleKeyPress(e) {

  if (e.shiftKey || e.ctrlKey || e.altKey) {
    return;
  }

  const handlers = [
    new ArrowUpHandler(e, this),
    new ArrowDownHandler(e, this),
    new EnterHandler(e, this),
    new TabHandler(e, this),
    new EscapeHandler(e, this),
    new SpaceHandler(e, this),
  ];

  handlers.map(handler => {
    if (handler.KEY_CODE === e.which) {
      handler.handle();
    }
  });

}

export default handleKeyPress;