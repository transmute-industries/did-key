## Getting Started

```
npm run server
```

### Resolve a DID

http://localhost:5010/did-key/us-central1/main/api/dids/did:key:z6MkpTHR8VNsBxYAAWHut2Geadd9jSwuBV8xRoAnwWsdvktH

```
curl -X POST http://localhost:5010/did-key/us-central1/main/api/dids/test
curl -X POST http://did-key.web.app/api/dids/test
```

### Set your Firebase Config

```
npx firebase functions:config:set did_key=$(node -e "console.log(JSON.stringify(require('./.runtimeconfig.json').did_key))")
```

### Get your Firebase Config

```
npx firebase functions:config:get
```
