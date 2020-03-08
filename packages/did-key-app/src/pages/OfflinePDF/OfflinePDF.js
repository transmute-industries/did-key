import React from "react";
import PropTypes from "prop-types";


import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid/Grid';

import { Ed25519KeyPair } from "crypto-ld";
import didMethodKey from "did-method-key";
import {QR} from '@bloomprotocol/qr-react'

import ReactToPdf from 'react-to-pdf';

import BasePage from "../BasePage/BasePage";

import ScanQRCodeDialog from '../../components/ScanQRCodeDialog/ScanQRCodeDialog'

// import qrCodeLogo from '../../components/Logo/logo512-white.png'

import JSONEditor from '../../components/JSONEditor/JSONEditor';

import documentLoader from '../../networking/documentLoader'


const { keyToDidDoc } = didMethodKey.driver();


const vcjs = require("vc-js");
const jsigs = require("jsonld-signatures");
const { Ed25519Signature2018 } = jsigs.suites;


const defaultVc = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://www.w3.org/2018/credentials/examples/v1"
  ],
  id: "http://example.gov/vc/1",
  type: ["VerifiableCredential", "UniversityDegreeCredential"],
  issuer: "https://example.edu",
  issuanceDate: new Date().toISOString(),
  credentialSubject: {
    id: "did:example:1",
    degree: {
      type: "BachelorDegree",
      name: "Cyber Security"
    }
  }
}

const qrOptions = { 
  ecLevel: 'L',
  fgColor: '#000',
  padding: 32,
  size: 400, 
  // logoOpacity: 1, 
  // logoImage: qrCodeLogo,
  hideLogo: true,
}

const options = {
  unit: 'px',
  compress: true,
  format: 'a4',
};

const generatePrivateKey = async () =>{
  const edKey = await Ed25519KeyPair.generate();
  const doc = keyToDidDoc(edKey);
  const key = {
    id: doc.publicKey[0].id,
    type: edKey.type,
    controller: doc.id,
    privateKeyBase58: edKey.privateKeyBase58,
    publicKeyBase58: edKey.publicKeyBase58
  }
  return key
}

const OfflinePDF = ({ tmui, setTmuiProp }) => {

  // React.useEffect(()=>{
  //   (async ()=>{
  //     const edKey = await Ed25519KeyPair.generate();
  //     const doc = keyToDidDoc(edKey);
  //     const key = {
  //       id: doc.publicKey[0].id,
  //       type: edKey.type,
  //       controller: doc.id,
  //       privateKeyBase58: edKey.privateKeyBase58,
  //       publicKeyBase58: edKey.publicKeyBase58
  //     }
  //     let suite = new Ed25519Signature2018({ 
  //       key: edKey,
  //       verificationMethod: key.id
  //     });
  //     console.log('heres', key)
  
  //     const signed = await vcjs.issue({
  //       credential: {
  //         ...defaultVc,
  //         issuer: key.controller
  //       },
  //       suite,
  //       // documentLoader
  //     });
      
  //     suite = new Ed25519Signature2018({});
  
  //      const result = await vcjs.verify({
  //       credential: signed,
  //       // compactProof: false,
  //       documentLoader: documentLoader,
  //       // purpose: new AssertionProofPurpose(),
  //       suite
  //     });
  //     console.log(result)
  //   })();
   
  // })

  const [state, setState] = React.useState({
    isScanQrCodeDialogOpen: false,
    key: null,
    vc: defaultVc,
    verified: false,
  });
  const {isScanQrCodeDialogOpen, key, vc} = state;

  const [panelValues, setPanelValues] = React.useState({
    panel0: false,
    panel1: false,
    panel2: false,
    panel3: false,
  });

  const handleChangePanels = panel => () => {
    setPanelValues({
      ...panelValues,
      // eslint-disable-next-line
      [panel]: !panelValues[panel],
    });
  };

  const renderKey = () =>{
    if (!key){
      return '';
    }
    return (
        <ReactToPdf filename="did-key-private-key.pdf" options={options} x={-60}>
        {({toPdf, targetRef}) =>  {
          window.toPdf = toPdf;
          return (
          <React.Fragment>
          <div style={{display: 'block', padding: '16px', width: '500px', height: '500px', textAlign: 'center', margin: '0 auto'}} ref={targetRef} >
            <Typography variant={'h5'}>Private Key</Typography>
            <div>
              <QR data={{privateKeyBase58: key.privateKeyBase58, publicKeyBase58: key.publicKeyBase58,}} options={qrOptions}  />
            </div>
            <Typography variant={'caption'}>{key.controller.split(':').pop()}</Typography>
          </div>
           </React.Fragment>
        )}
        
        }
        </ReactToPdf>
    );
  }

  const renderVC = () =>{
    if (!vc || !vc.proof){
      return '';
    }
    return (
        <ReactToPdf filename="did-key-verifiable-credential.pdf" options={options} x={-60} y={-100}>
        {({toPdf, targetRef}) =>  {
          window.toPdf = toPdf;
          return (
          <React.Fragment>
          <div style={{display: 'block', padding: '16px', width: '500px', height: '600px', textAlign: 'center', margin: '0 auto', marginBottom: '-100px'}} ref={targetRef} >
            <Typography variant={'h5'}>Credential</Typography>
            <div>
              <QR data={vc} options={qrOptions}  />
            </div>
            <Typography variant={'caption'}>{vc.id}</Typography>
          </div>
           </React.Fragment>
        )}
        
        }
        </ReactToPdf>
    );
  }

  

  const renderVerify = (vc) =>{
    if (!vc.proof){
      return ''
    } 
    return ( <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <JSONEditor
        jsonObject={vc}
        onChange={(data)=>{
          // setState({
          //   ...state,
          //   vc: JSON.parse(data)
          // })
        }}
        // style={{ height: "128px" }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
       {renderVC(vc)}
      </Grid>
      <Grid item xs={12} >
      <Typography>Verified: {JSON.stringify(state.verified)}</Typography>
      </Grid>
      {/* <Grid item xs={12} >
      <Button variant={'contained'} onClick={async ()=>{
          const suite = new Ed25519Signature2018({});
          const result = await vcjs.verify({
            credential: vc,
            documentLoader: documentLoader,
            suite
          });
          setState({
            ...state,
            verified: result.verified
          })
          // console.log(result)
      }}>Verify</Button>
      </Grid> */}
    </Grid>)
  }

 
  return (
    
    <BasePage tmui={tmui} setTmuiProp={setTmuiProp}>
   
     <ExpansionPanel
        // eslint-disable-next-line
        expanded={panelValues['panel0']}
        onChange={handleChangePanels('panel0')}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel0-content`}
          id={`panel0-header`}
        >
          <Typography>Create DID</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ flexDirection: 'column' }} >
          {renderKey()}
          <Button variant={'contained'} style={{marginBottom: '32px'}} onClick={async ()=>{
            const key = await generatePrivateKey();
            setState({
              ...state,
              key,
              vc: {
                ...state.vc,
                issuer: key.controller
              }
            })
            setTimeout(()=>{
              window.toPdf();
            }, 1 * 1000);
          }}>Create a DID Key</Button>
            <Typography><i>Remember to print your key and store it in a private and secure location.</i></Typography>
          <br/>
        </ExpansionPanelDetails>
      </ExpansionPanel>

     <ExpansionPanel
        // eslint-disable-next-line
        expanded={panelValues['panel1']}
        onChange={handleChangePanels('panel1')}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel1-content`}
          id={`panel1-header`}
        >
          <Typography>Import DID from QRCode</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
          <Typography gutterBottom>You must have a QR Code with an embedded crypto-ld private key to use this method of import.</Typography>
          <Button variant={'contained'} color={'secondary'} onClick={()=>{
            setState({
              ...state,
              isScanQrCodeDialogOpen: true,
            });
          }}>Scan QR Code</Button>
          <ScanQRCodeDialog
            open={isScanQrCodeDialogOpen}
            onSubmit={async (data)=>{
              if (data.credentialSubject){
            
                const suite = new Ed25519Signature2018({});
                const result = await vcjs.verify({
                  credential: data,
                  documentLoader: documentLoader,
                  suite
                });
            
                setState({
                  ...state,
                  vc: data,
                  verified: result.verified,
                  isScanQrCodeDialogOpen: false,
                })
              } else {
                const edKey = await Ed25519KeyPair.from({
                  ...data
                })
                const doc = keyToDidDoc(edKey);
                const key1 = {
                  id: doc.publicKey[0].id,
                  type: edKey.type,
                  controller: doc.id,
                  privateKeyBase58: edKey.privateKeyBase58,
                  publicKeyBase58: edKey.publicKeyBase58
                }
                setState({
                  ...state,
                  key: key1,
                  vc: {
                    ...state.vc,
                    issuer: key1.controller
                  },
                  isScanQrCodeDialogOpen: false,
                })

              }
              
            }}
            onClose={() => {
              setState({
                isScanQrCodeDialogOpen: false,
              });
            }}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel
        // eslint-disable-next-line
        expanded={panelValues['panel3']}
        onChange={handleChangePanels('panel3')}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel3-content`}
          id={`panel3-header`}
        >
          <Typography>Import and verify Credential from QRCode</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
         
        {renderVerify(vc)}

        <Button variant={'contained'} color={'secondary'} onClick={()=>{
            setState({
              ...state,
              isScanQrCodeDialogOpen: true,
            });
          }}>Scan Credential to Verify</Button>
        
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel
        // eslint-disable-next-line
        expanded={panelValues['panel2']}
        disabled={!key}
        onChange={handleChangePanels('panel2')}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel2-content`}
          id={`panel2-header`}
        >
          <Typography>Create Credential</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
         

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <JSONEditor
            jsonObject={vc}
            onChange={(data)=>{
              setState({
                ...state,
                vc: JSON.parse(data)
              })
            }}
            style={{ height: "435px", marginBottom: '16px' }}
            />
            <Button variant={'contained'} onClick={async ()=>{
            let suite = new Ed25519Signature2018({
              key: new Ed25519KeyPair(key)
            });
            const signed = await vcjs.issue({
              credential: {
                ...vc,
                issuer: key.controller
              },
              suite,
              // documentLoader
            });
            setState({
              ...state,
              vc: signed,
            })
            setTimeout(()=>{
              window.toPdf();
            }, 1 * 1000);
          }}>Create Credential</Button>
          </Grid>
          <Grid item xs={12} sm={6}>
           {renderVC(vc)}
          </Grid>
            {/*<Grid item xs={12} >
          

       <Button variant={'contained'} style={{float: 'right'}} onClick={async ()=>{
            window.toPdf();
          }}>Download Credential</Button> 
          </Grid>*/}
        </Grid>
        
        </ExpansionPanelDetails>
      </ExpansionPanel>

    </BasePage>
  )
};

OfflinePDF.propTypes = {
  tmui: PropTypes.object,
  setTmuiProp: PropTypes.func
};

export default OfflinePDF;
