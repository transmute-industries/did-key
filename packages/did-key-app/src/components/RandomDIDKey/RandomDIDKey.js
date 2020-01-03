import React from "react";

import { Ed25519KeyPair } from "crypto-ld";
import didMethodKey from "did-method-key";

import ReadOnlyJsonView from "../ReadOnlyJsonView/ReadOnlyJsonView";

const { keyToDidDoc } = didMethodKey.driver();

class App extends React.Component {
  state = { key: null };
  async componentDidMount() {
    const edKey = await Ed25519KeyPair.generate();
    const doc = keyToDidDoc(edKey);
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
      <div>
        <h2>Private Key</h2>
        <ReadOnlyJsonView
          jsonObject={this.state.key}
          style={{ height: "128px" }}
        />
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
      </div>
    );
  }
}

export default App;
