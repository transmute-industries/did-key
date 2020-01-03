import React from "react";
import PropTypes from "prop-types";

import BasePage from "../BasePage/BasePage";

import WebKeystore from "../../components/WebKeystore/WebKeystore";

// import history from "../../store/history";

const KeystorePage = ({
  tmui,
  doSetTmuiProp,
  keystore,
  doImportKeystore,
  doDeleteKeystore,
  doToggleKeystore,
  doCreateWalletKeystore
}) => (
  <BasePage tmui={tmui} doSetTmuiProp={doSetTmuiProp}>
    <WebKeystore
      keystore={keystore}
      doImportKeystore={doImportKeystore}
      doCreateWalletKeystore={doCreateWalletKeystore}
      doDeleteKeystore={doDeleteKeystore}
      doToggleKeystore={doToggleKeystore}
    />
  </BasePage>
);

KeystorePage.propTypes = {
  tmui: PropTypes.any,
  doSetTmuiProp: PropTypes.any,
  keystore: PropTypes.any,
  doImportKeystore: PropTypes.any,
  onWalletDelete: PropTypes.any,
  doToggleKeystore: PropTypes.any,
  doCreateWalletKeystore: PropTypes.any
};

export default KeystorePage;
