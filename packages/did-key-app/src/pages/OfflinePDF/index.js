import React from "react";

import { compose } from "redux";

import tmui from "../../store/tmui";

import OfflinePDF from "./OfflinePDF";

const container = compose(tmui.container);

export default container(props => {
  return <OfflinePDF {...props} />;
});
