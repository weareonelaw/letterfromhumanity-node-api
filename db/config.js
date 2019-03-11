require('dotenv').load();
const fs = require('fs');
const parse = require('pg-connection-string').parse;

const dbURL = parse(process.env.DATABASE_URL);

module.exports = {
  development: {
    username: dbURL.user,
    password: dbURL.password,
    database: dbURL.database,
    host: dbURL.host,
    port: dbURL.port || 5432,
    dialect: 'postgres'
  },
  stage: {
    username: dbURL.user,
    password: dbURL.password,
    database: dbURL.database,
    host: dbURL.host,
    port: dbURL.port || 5432,
    dialect: 'postgres'
  },
  test: {
    username: 'database_test',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: dbURL.user,
    password: dbURL.password,
    database: dbURL.database,
    host: dbURL.host,
    port: dbURL.port || 5432,
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      "ssl": true,
    }
    // dialectOptions: {
    //   ssl: {
    //     ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
    //   }
    // }
  }
};