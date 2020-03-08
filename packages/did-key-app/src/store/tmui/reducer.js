import { handleActions } from "redux-actions";
import { setTmuiProp } from "./actions";

// TODO: UPDATE PLACEHOLDER
const initialState = {
  isPrimaryDrawerOpen: false,
  isSpeedDialogOpen: false,
  activeTabIndex: 0,
  currentRole: {
    label: 'Tier 0',
    value: 'tier0',
  }
};

export default handleActions(
  {
    [setTmuiProp]: (state, { payload }) => ({ ...state, ...payload })
  },
  initialState
);
