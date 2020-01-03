import React from "react";
import PropTypes from "prop-types";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import List from "@material-ui/core/List";

import CodeIcon from "@material-ui/icons/Code";
import HomeIcon from "@material-ui/icons/Home";

import VpnKeyIcon from "@material-ui/icons/VpnKey";

import history from "../../store/history";

const sideMenuPrimaryItem = [
  {
    label: "Home",
    icon: <HomeIcon />,
    showForRoles: ["tier0", "tier1", "tier2"],
    onClick: () => {
      history.push("/");
    }
  },

  {
    label: "Keystore",
    icon: <VpnKeyIcon />,
    showForRoles: ["tier0", "tier1", "tier2"],
    onClick: () => {
      history.push("/keystore");
    }
  },
  {
    label: "DID Method Spec",
    icon: <CodeIcon />,
    showForRoles: ["tier0", "tier1", "tier2"],
    onClick: () => {
      window.open("https://digitalbazaar.github.io/did-method-key/", "_blank");
    }
  },
  {
    label: "DID Method Driver",
    icon: <CodeIcon />,
    showForRoles: ["tier0", "tier1", "tier2"],
    onClick: () => {
      window.open(
        "https://github.com/digitalbazaar/did-method-key-js",
        "_blank"
      );
    }
  },
  {
    label: "Swagger",
    icon: <CodeIcon />,
    showForRoles: ["tier0", "tier1", "tier2"],
    onClick: () => {
      window.open("https://did-key.web.app/api/docs", "_blank");
    }
  }
];

function DrawerContent({ tmui, doSetTmuiProp }) {
  const values = {
    currentRole: {
      label: "User",
      value: "tier0"
    }
  };

  return (
    <React.Fragment>
      <List>
        {sideMenuPrimaryItem
          .filter(i => {
            return i.showForRoles.indexOf(values.currentRole.value) !== -1;
          })
          .map(i => (
            <ListItem button key={i.label} onClick={i.onClick}>
              <ListItemIcon>{i.icon}</ListItemIcon>
              <ListItemText primary={i.label} />
            </ListItem>
          ))}
      </List>
    </React.Fragment>
  );
}

DrawerContent.propTypes = {
  tmui: PropTypes.any,
  doSetTmuiProp: PropTypes.any
};

export default DrawerContent;
