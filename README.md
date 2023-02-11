# [kodim.cz](https://kodim.cz/)

## Development

### Create configuration file

```sh
cp server-config.sample.json5 server-config.json5
```

Don't forget to adjust `contentDir`.

### Install dependencies

```sh
npm ci
```

### Start database

```sh
docker run --name mongodb -p 27017:27017 mongo
```

Or `start` any other time.

```sh
docker start mongodb
```

### Build assets

```sh
npm run dev
```

### Start server

```sh
cd dist
npx nodemon server.js
```
