import React from "react";
import PropTypes from "prop-types";

import KeystoreCard from "./KeystoreCard";
import KeystoreLockDialog from "./KeystoreLockDialog";
class WebKeystore extends React.Component {
  state = {
    isKeystoreLockDialogOpen: false
  };
  getKeystoreContext(keystore) {
    if (!keystore || keystore.data === null) {
      return {
        status: "empty",
        title: "No Keystore",
        subheader: "Please import or generate a keystore.",
        passwordPrompt: ""
      };
    }

    if (typeof keystore.data === "string") {
      return {
        status: "locked",
        title: "Locked Keystore",
        subheader: "Please unlock keystore before use.",
        passwordPrompt:
          "Enter the password used when the keystore was created or last locked."
      };
    }

    if (typeof keystore.data === "object") {
      return {
        status: "unlocked",
        title: "Unlocked Keystore",
        subheader:
          "Keystore is ready for use. You must lock before you can export.",
        passwordPrompt: "Enter a password to lock this keystore."
      };
    }
  }

  onOpenKeystoreLockDialog = () => {
    this.setState({
      isKeystoreLockDialogOpen: true
    });
  };

  doToggleKeystore = password => {
    this.setState({
      isKeystoreLockDialogOpen: false
    });
    this.props.doToggleKeystore(password);
  };

  render() {
    const {
      keystore,
      doImportKeystore,
      doDeleteKeystore,
      doCreateWalletKeystore
    } = this.props;
    const {
      status,
      title,
      subheader,
      passwordPrompt
    } = this.getKeystoreContext(keystore);
    const { isKeystoreLockDialogOpen } = this.state;
    return (
      <React.Fragment>
        <KeystoreCard
          status={status}
          title={title}
          subheader={subheader}
          keystore={keystore}
          doImportKeystore={doImportKeystore}
          doDeleteKeystore={doDeleteKeystore}
          doCreateWalletKeystore={doCreateWalletKeystore}
          onOpenKeystoreLockDialog={this.onOpenKeystoreLockDialog}
        />
        <KeystoreLockDialog
          message={passwordPrompt}
          open={isKeystoreLockDialogOpen}
          keystoreState={status}
          doToggleKeystore={this.doToggleKeystore}
        />
      </React.Fragment>
    );
  }
}

WebKeystore.propTypes = {
  keystore: PropTypes.object,
  doImportKeystore: PropTypes.func,
  doToggleKeystore: PropTypes.func
};

export default WebKeystore;
