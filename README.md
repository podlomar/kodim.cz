# [kodim.cz](https://kodim.cz/)

## Development

### Create configuration file

```sh
cp server-config.sample.json5 server-config.json5
```

Don't forget to adjust `contentDir`.

#### contentDir

If `contentDir` is set to `/var/www/content`, then to display the content of repository [daweb-vyuka](https://github.com/Czechitas-podklady-WEB/daweb-vyuka), the `/var/www/content` directory will have the following content:

```
vyuka/
  daweb-vyuka/     # contents of the https://github.com/Czechitas-podklady-WEB/daweb-vyuka repository
    .git/
    priprava/
    html-a-css/
    entry.yml
    …
  entry.yml
```

In the `vyuka/daweb-vyuka` directory, there will be a cloned [repository with materials](https://github.com/Czechitas-podklady-WEB/daweb-vyuka) from GitHub.
The `entry.yml` file can have the following contents:

```yaml
divisions:
  - title: Testovací kurzy
    lead: Kurzy určené pro testování při vývoji Kódim.cz
    courses:
      - repository: https://github.com/Czechitas-podklady-WEB/daweb-vyuka
        branch: master
        link: daweb-vyuka
```


#### GitHub OAuth2 authentication

If you want to use GitHub login for local development, create an OAuth application on GitHub.
On the GitHub site, go profile icon → Settings → Developer settings → [OAuth Apps](https://github.com/settings/developers) and select the New OAuth app button.
* set *Application name*, for example „Kodim.cz local development“
* set *Homepage URL* to `http://localhost:3000`
* set *Authorization callback URL* to `http://localhost:3000/prihlasit/github`
* unset Enable Device Flow
* click *Register application*

After clicking on *Register application*, a page will appear where the `ClientID` is displayed.
Copy ClientID into `server-config.json5` file.
Then click *Generate a new client secret* and paste the generated client secret into the `server-config.json5` configuration file.

```javascript
githubApp: {
    clientId: 'xxxxxxx',
    clientSecret: 'xxxxxxxxxxxxx',
}
```

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
