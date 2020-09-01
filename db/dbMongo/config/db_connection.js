const mongoose = require('mongoose');
require('dotenv').config()
const Schema = mongoose.Schema;
mongoose.set('debug', true);
mongoose.Promise = require('bluebird');

mongoose.connect(process.env.MONGO_URI_DEV, { useNewUrlParser: true, useUnifiedTopology:true }, () => {
    console.log('We are connected to Mongo from db_connection in server.js');
});

//Check if we connected to the database or not
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
