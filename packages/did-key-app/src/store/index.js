import { connectRouter } from "connected-react-router";

// Reducers.

import keystore from "./keystore";
import tmui from "./tmui";
import history from "./history";

export default {
  router: connectRouter(history),
  keystore: keystore.reducer,
  tmui: tmui.reducer
};
