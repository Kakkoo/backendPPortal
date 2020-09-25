const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.kidsdbs = require("./kidsdb.model.js")(mongoose);
db.namepassworddbs = require("./namepassworddb.model.js")(mongoose);
db.tdatas = require("./tdata.model.js")(mongoose);
db.tdnames = require("./tdname.model.js")(mongoose);
db.tdfillers = require("./tdfiller.model.js")(mongoose);
db.tdmeetingnames = require("./tdmeetingname.model.js")(mongoose);

module.exports = db;
