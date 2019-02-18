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

### Migrations

[Sequelize migrations](http://docs.sequelizejs.com/manual/tutorial/migrations.html)



### Postgres

If you have Docker installed you can easily start a Postgres container to run your database ([reference])(https://hackernoon.com/dont-install-postgres-docker-pull-postgres-bee20e200198)
. In order to keep the data persistant across container restarts you need to mount a folder to store the data in. Creating a folder (absolute path needed) and start the container:

```sh
mkdir -p $HOME/.docker-data/postgres
docker run --rm --name pg-letterfromhumanity -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/.docker-data/postgres:/var/lib/postgresql/data postgres
```

Now you can connect by connecting to postgres://postgres:docker@localhost:5432/postgres 🎉

## Deploy

App is running at Heroku. In order to deploy a new version, just push to the Heroku remote (master branch):

```sh
git push heroku master
```

### Migrations?

```sh
node_modules/.bin/sequelize db:migrate
```
