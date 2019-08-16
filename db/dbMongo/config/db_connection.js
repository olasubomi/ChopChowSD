const mongoose = require('mongoose');
require('dotenv').config()
const Schema = mongoose.Schema;
mongoose.set('debug', true);
mongoose.Promise = require('bluebird');

mongoose.connect(process.env.MONGO_URI_DEV, { useNewUrlParser: true })

//To check if we connected to the database or not
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
    console.log('We are connected to the Mongo database :)');
}
);

