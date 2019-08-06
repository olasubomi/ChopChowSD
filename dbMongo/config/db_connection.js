const mongoose =  require ('mongoose');
const Schema = mongoose.Schema;

// for connection database
mongoose.set('debug', true);
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.DB_DEV_URL,  { useNewUrlParser: true })

 //To check if we connected to the database or not
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log('We are connected to the Mongo database :)');}
);


const mongoose = require('mongoose');
// load environment variables from and .env into a process.env
require('dotenv').config();

// change uri to dev database
mongoUri = process.env.MONGO_URI_DEV;


const dbConnection = () => {
mongoose
.connect(mongoUri, { useNewUrlParser: true })
.then(() => console.log('MongoDB successfully connected 🔥 to', mongoUri))
.catch(err => console.log('DB connection error', err));
};

module.exports = dbConnection;




 