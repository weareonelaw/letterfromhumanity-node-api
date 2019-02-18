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

### Run Postgres in Docker

If you have Docker installed you can easily start a Postgres container to run your database ([reference])(https://hackernoon.com/dont-install-postgres-docker-pull-postgres-bee20e200198)
. In order to keep the data persistant across container restarts you need to mount a folder to store the data in. Creating a folder (absolute path needed) and start the container:

```sh
mkdir -p $HOME/.docker-data/postgres
docker run --rm --name pg-letterfromhumanity -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/.docker-data/postgres:/var/lib/postgresql/data postgres
```

Now you can connect by connecting to `postgres://postgres:docker@localhost:5432/postgres` 🎉

## Database / Sequelize

Create database: `npx sequelize db:create``

New Model: npx sequelize model:generate --name User --attributes firstName:string
_NOTE:_ You can edit and add more specific definitions (unique, allow null, ...) in the created file in models/user.js. If so, also modify the migration file created in migrations folder accordingly.

https://medium.com/@andrewoons/how-to-define-sequelize-associations-using-migrations-de4333bf75a7

New Field:

### Migrations

[Sequelize migrations](http://docs.sequelizejs.com/manual/tutorial/migrations.html)

In order to run the DB migrations just to

```sh
npm run db:migrate
# or
npx sequelize db:migrate
```

It will execute the needed migrations for you.

In order to create a new migration:

```sh
npx sequelize migration:generate --name added-lastname
```

This will create the file with a skeleton for your up / down method. You still need to implement it yourself.

The migrations is being passed a `queryInterface` that will help you interact with the DB. [See docs](http://docs.sequelizejs.com/class/lib/query-interface.js~QueryInterface.html).

## Deploy

App is running at Heroku. In order to deploy a new version, just push to the Heroku remote (master branch):

```sh
git push heroku master
```

### Migrations?

```sh
node_modules/.bin/sequelize db:migrate
```
