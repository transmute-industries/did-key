import React from "react";

import { Ed25519KeyPair } from "crypto-ld";
import X25519KeyPair from 'x25519-key-pair';
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
    const ed25519Key = await Ed25519KeyPair.generate();
    const x25519Key = await X25519KeyPair.fromEdKeyPair(ed25519Key);
    const doc = keyToDidDoc(ed25519Key);
    ed25519Key.id = doc.publicKey[0].id;
    this.setState({
      ed25519Key,
      x25519Key,
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
              jsonObject={{
                ed25519Key: this.state.ed25519Key,
                x25519Key: this.state.x25519Key
              }}
              style={{ height: "256px" }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <div style={{float: 'right'}}>
              <QR data={JSON.stringify({
                ed25519Key: this.state.ed25519Key,
                x25519Key: this.state.x25519Key
              })} options={qrOptions}  />
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
