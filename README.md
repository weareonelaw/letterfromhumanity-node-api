# Letter From Humanity

This is the API that is a part of the Letter From Humanity Project.

## Development

In order to run it locally you need to have [node](https://nodejs.org) installed. Then navigate into the project root and run:

```sh
npm install
npm start
```

The following environment variables needs to be set. Create an environment file in the root called `.env` and add the following keys with proper values:

```sh
DATABASE_URL=
```


## Deploy

App is running at Heroku. In order to deploy a new version, just push to the Heroku remote (master branch):

```sh
git push heroku master
```
