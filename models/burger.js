var orm = require("../config/orm.js");

orm.selectAll("burger");
orm.insertOne("grilled chicken cheese sandwich");
orm.updateOne("true", "2");

module.exports = burger;