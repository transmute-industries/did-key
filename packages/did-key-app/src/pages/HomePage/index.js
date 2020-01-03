import React from "react";
import HomePage from "./HomePage";

import { compose } from "redux";

import tmuiDuck from "../../store/tmui";

const container = compose(tmuiDuck.container);

export default container(props => {
  return <HomePage tmui={props.tmui} doSetTmuiProp={props.doSetTmuiProp} />;
});
