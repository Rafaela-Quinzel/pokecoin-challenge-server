const mongoose = require('mongoose');
const mongodb = require('../config/mongodb');
const DATABASE_URL = mongodb.mongodb_host;


mongoose.connect(DATABASE_URL);
mongoose.Promise = global.Promise;

module.exports = mongoose;