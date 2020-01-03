import React from "react";

import HomeIcon from "@material-ui/icons/Home";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

import history from "../../store/history";

const primarySearchAccountMenuMobile = [
  {
    badgeContent: 0,
    ariaLabel: "keystore",
    icon: <VpnKeyIcon />,
    label: "Keystore",
    onClick: () => {
      history.push("/keystore");
    }
  },
  {
    badgeContent: 0,
    ariaLabel: "home",
    icon: <HomeIcon />,
    label: "Home",
    onClick: () => {
      history.push("/");
    }
  }
];

export default primarySearchAccountMenuMobile;
