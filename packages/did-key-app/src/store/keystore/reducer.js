import { handleActions } from "redux-actions";
import { setEdvProp } from "./actions";

import config from "../../config";

// TODO: UPDATE PLACEHOLDER
const initialState = {
  ...config
};

export default handleActions(
  {
    [setEdvProp]: (state, { payload }) => ({ ...state, ...payload })
  },
  initialState
);
