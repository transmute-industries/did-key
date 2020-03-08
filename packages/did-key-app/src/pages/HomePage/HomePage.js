import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid/Grid';

import BasePage from "../BasePage/BasePage";

import history from "../../store/history";

import RandomDIDKey from "../../components/RandomDIDKey/RandomDIDKey";

const HomePage = ({ tmui, setTmuiProp }) => (
  <BasePage tmui={tmui} setTmuiProp={setTmuiProp}>

    <Typography variant={'h5'} gutterBottom>
      Transmute DID Key
    </Typography>

    <Typography paragraph>
      DID Key is a lightweight Decentralized Identifier thats easy to use and ideal for offline use cases. 
    </Typography>

    <Grid container>
      <Grid item xs={12} sm={6}>
      <iframe title="intro video" width="560" height="315" src="https://www.youtube.com/embed/-i4am8LoV7s" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Typography paragraph style={{marginTop: '32px'}}>
      If you are looking for a Keystore to use with other applications, like Encrypted Data Vaults, click "Setup Keystore". If you just need a random did key, refresh the page and copy the information below.
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

      </Grid>
    </Grid>

    <RandomDIDKey />
  </BasePage>
);

HomePage.propTypes = {
  tmui: PropTypes.object,
  setTmuiProp: PropTypes.func
};

export default HomePage;
