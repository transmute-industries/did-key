import { withHandlers } from "recompose";

export default withHandlers({
  doSetTmuiProp: ({ doSetTmuiProp }) => payload => {
    doSetTmuiProp(payload);
  },
  doToggleSpeedDial: ({ doSetTmuiProp }) => payload => {
    doSetTmuiProp({ isSpeedDialogOpen: payload });
  },
  doSelectActiveTab: ({ doSetTmuiProp }) => activeTabIndex => {
    doSetTmuiProp({ activeTabIndex });
  },

  doFabClick: ({ doSetTmuiProp }) => context => {
    doSetTmuiProp({ fabClick: context });
  }
});
