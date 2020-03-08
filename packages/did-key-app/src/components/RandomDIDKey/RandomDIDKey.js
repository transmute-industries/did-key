import React from "react";

import { Ed25519KeyPair } from "crypto-ld";
import didMethodKey from "did-method-key";
import {QR} from '@bloomprotocol/qr-react'
import Grid from '@material-ui/core/Grid/Grid'

import ReadOnlyJsonView from "../ReadOnlyJsonView/ReadOnlyJsonView";

import qrCodeLogo from '../Logo/logo512-white.png'

const { keyToDidDoc } = didMethodKey.driver();

const qrOptions = { 
  fgColor: '#594aa8',
  padding: 8,
  size: 256, 
  logoOpacity: 1, 
  logoImage: qrCodeLogo
}


class App extends React.Component {
  state = { key: null };
  async componentDidMount() {
    const edKey = await Ed25519KeyPair.generate();
    const doc = keyToDidDoc(edKey);
    edKey.id = doc.publicKey[0].id;
    this.setState({
      key: edKey,
      doc,
      resolverUrl: "https://did-key.web.app/api/dids/" + doc.id
    });
  }
  render() {
    if (!this.state.doc) {
      return "generating...";
    }
    return (
   
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
          <h2>Private Key</h2>
          <ReadOnlyJsonView
              jsonObject={this.state.key}
              style={{ height: "128px" }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <div style={{float: 'right'}}>
              <QR data={JSON.stringify(this.state.key)} options={qrOptions}  />
            </div>
          </Grid>

          <Grid item xs={12}>
            <h3>DID Document</h3>
            <a style={{ wordBreak: "break-all" }} href={this.state.resolverUrl}>
              {this.state.resolverUrl}
            </a>

            <br />
            <br />
            <ReadOnlyJsonView
              jsonObject={this.state.doc}
              style={{ height: "520px" }}
            />
          </Grid>
        </Grid>
    );
  }
}

export default App;
