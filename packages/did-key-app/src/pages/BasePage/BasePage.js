import React from "react";
import PropTypes from "prop-types";
import AppBarWithDrawer from "../../components/AppBarWithDrawer/AppBarWithDrawer";
import DrawerContent from "../../components/AppBarWithDrawer/DrawerContent";

import logo from "../../components/Logo/logo.svg";

import Theme from "../../components/Theme/Theme";
import Snackbar from "../../components/Snackbar/Snackbar";

const BasePage = ({ tmui, doSetTmuiProp, children }) => (
  <Theme>
    <AppBarWithDrawer
      headerImage={logo}
      drawer={<DrawerContent tmui={tmui} doSetTmuiProp={doSetTmuiProp} />}
      content={children}
    />
    <Snackbar tmui={tmui} doSetTmuiProp={doSetTmuiProp} />
  </Theme>
);

BasePage.propTypes = {
  children: PropTypes.any.isRequired,
  tmui: PropTypes.any,
  doSetTmuiProp: PropTypes.any
};

export default BasePage;
