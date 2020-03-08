import React from "react";
import PropTypes from "prop-types";


import Theme from "../../components/Theme/Theme";
import Snackbar from "../../components/Snackbar/Snackbar";

import AppBarWithDrawer from "../../components/AppBarWithDrawer/AppBarWithDrawer";
import DrawerContent from "../../components/AppBarWithDrawer/DrawerContent";
import rightHandAccountMenu from '../../components/AppBarWithDrawer/rightHandAccountMenu';

import logo from "../../components/Logo/logo.svg";


const BasePage = ({ tmui, setTmuiProp, children }) => (
  <Theme>
    <AppBarWithDrawer
        rightHandAccountMenu={rightHandAccountMenu}
        headerImage={logo}
        drawer={<DrawerContent tmui={tmui} setTmuiProp={setTmuiProp} />}
        content={children}
      />
    <Snackbar tmui={tmui} setTmuiProp={setTmuiProp} />
  </Theme>
);

BasePage.propTypes = {
  children: PropTypes.any.isRequired,
  tmui: PropTypes.any,
  setTmuiProp: PropTypes.any
};

export default BasePage;
