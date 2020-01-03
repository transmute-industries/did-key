import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import BasePage from "../BasePage/BasePage";

import history from "../../store/history";

import RandomDIDKey from "../../components/RandomDIDKey/RandomDIDKey";

const HomePage = ({ tmui, doSetTmuiProp }) => (
  <BasePage tmui={tmui} doSetTmuiProp={doSetTmuiProp}>
    <Typography paragraph>
      Use the data below or setup a keystore for use with other demos...
    </Typography>

    <Button
      variant={"contained"}
      color={"primary"}
      onClick={() => {
        history.push("/keystore");
      }}
    >
      Setup Keystore
    </Button>

    <RandomDIDKey />
  </BasePage>
);

HomePage.propTypes = {
  tmui: PropTypes.object,
  doSetTmuiProp: PropTypes.func
};

export default HomePage;
