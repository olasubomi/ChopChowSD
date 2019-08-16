const { Pool } = require('pg');
const { parse } = require('url');
require('dotenv').config();

 let { DATABASE_URL: dbUrl } = process.env;

 const params = parse(dbUrl);
const {
  hostname: host, port, pathname, auth,
} = params;

 const [user, password] = auth.split(':');

 const options = {
  host,
  port,
  user,
  password,
  database: pathname.split('/')[1],
  max: process.env.MAX_DB_CONNECTION || 2,
  ssl:process.env.hostname !== 'localhost',
};

 const pool = new Pool(options);
module.exports = pool;
