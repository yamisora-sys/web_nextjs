var Migrations = require("migrations");
var MetaFile = require("migrations/lib/meta/file");
var cli = require("migrations/lib/cli");
require("dotenv").config();


var meta = {};
// Meta Storage has very basic interface:
var storage = {
  get: function (cb) {
    cb();
  },
  set: function (value, cb) {
    cb(null, meta);
  },
};

name = cli.create !== true ? cli.create : "name";


template = `var orm = require('migrations/lib/orm');
var table = "${name}";
exports.up = (next) => {
  orm.connect(process.env.MYSQL, (err, db) => {
  })
  let model = define(table, {
    id:  {type: 'serial', key: true},
  })
  next();
};

exports.down = (next) => {
  orm.connect(process.env.MYSQL, (err, db) => {
    var model = define(table, {});
    model.drop();
  })
  next();
};
`

module.exports = new Migrations({
  dir: process.cwd() + process.env.MIGRATIONS_DIR,
  meta: storage,
  template: template,
});

module.exports.run();
