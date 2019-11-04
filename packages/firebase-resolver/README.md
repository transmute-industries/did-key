### Set your Firebase Config

```
npx firebase functions:config:set did_key=$(node -e "console.log(JSON.stringify(require('./.runtimeconfig.json').did_key))")
```

### Get your Firebase Config

```
npx firebase functions:config:get
```
