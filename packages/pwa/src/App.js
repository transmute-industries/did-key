import React from "react";

import { Ed25519KeyPair } from "crypto-ld";
import didMethodKey from 'did-method-key';
import "./App.css";

const { keyToDidDoc } = didMethodKey.driver();


class App extends React.Component{
  state = {key : null}
  async componentDidMount(){
    const edKey = await Ed25519KeyPair.generate();
    const doc = keyToDidDoc(edKey);
    this.setState({
      key: edKey,
      doc,
      resolverUrl: "https://did-key.web.app/api/dids/" + doc.id
    })
  }
  render(){
    if (!this.state.doc){
      return 'generating...'
    }
      return (
        <div className="App">
          <div>
          <a href="https://did-key.web.app/api/docs">Swagger API</a> &nbsp;|&nbsp;
          <a href="https://did-key.web.app/schemas/com.transmute.did/didDocument/jsonschema/1-0-0.jsonld">JSON Schema</a>
          </div>
         
          <h4>Ed25519KeyPair</h4>
          <pre>{JSON.stringify(this.state.key, null, 2)}</pre>
          <h4><a href={this.state.resolverUrl}>{this.state.resolverUrl}</a></h4>
          <pre>{JSON.stringify(this.state.doc, null, 2)}</pre>
        </div>
      );
  }
}

export default App;
