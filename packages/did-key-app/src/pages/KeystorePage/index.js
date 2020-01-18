import React from "react";
import { compose } from "redux";

import tmuiDuck from "../../store/tmui";
import edvDuck from "../../store/keystore";

import KeystorePage from "./KeystorePage";

const container = compose(tmuiDuck.container, edvDuck.container);

export default container(props => {
  return (
    <KeystorePage
      tmui={props.tmui}
      doSetTmuiProp={props.doSetTmuiProp}
      {...props}
    />
  );
});
