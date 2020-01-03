import { handleActions } from "redux-actions";
import { doSetTmuiProp } from "./actions";

// TODO: UPDATE PLACEHOLDER
const initialState = {
  isPrimaryDrawerOpen: false,
  isSpeedDialogOpen: false,
  activeTabIndex: 0,
  currentRole: {
    label: "CBP Admin",
    value: "cbp_admin"
  }
};

export default handleActions(
  {
    [doSetTmuiProp]: (state, { payload }) => ({ ...state, ...payload })
  },
  initialState
);
