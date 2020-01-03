import React from "react";

import { storiesOf } from "@storybook/react";

import withReduxDecorator from "../../__storybook__/withReduxDecorator";
import HomePage from "./index";

storiesOf("Pages", module)
  .addDecorator(withReduxDecorator)
  .add("Home", () => <HomePage />);
