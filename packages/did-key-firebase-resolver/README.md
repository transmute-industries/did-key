## Getting Started

```
npm run server
```

### Resolve a DID

http://localhost:5010/did-key/us-central1/main/api/dids/did:key:z6MkpTHR8VNsBxYAAWHut2Geadd9jSwuBV8xRoAnwWsdvktH

```
curl -X POST http://localhost:5010/did-key/us-central1/main/api/dids/test -d '{"key1":"value1", "key2":"value2"}'
curl -X POST https://did-key.web.app/api/dids/test -d '{"key1":"value1", "key2":"value2"}'

curl -X POST http://localhost:5010/did-key/us-central1/main/api/dids/test  -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json"
```

### Set your Firebase Config

```
npx firebase functions:config:set did_key=$(node -e "console.log(JSON.stringify(require('./.runtimeconfig.json').did_key))")
```

### Get your Firebase Config

```
npx firebase functions:config:get
```
