// A model is closer to the data, the view is closer to the user. Controllers are in the middle range.
let orm = require("../config/orm.js");

let burger = {
    
    selectAll: function(cb) {
        orm.selectAll("burgers", function(res) {
            cb(res);
        });

    }, 
    insertOne: function(cols, vals, cb) {
        orm.insertOne("burgers", cols, vals, function(res) {
            cb(res);
        });
    },
    updateOne: function(objColVals, condition, cb) {
        orm.updateOne("burgers", objColVals, condition, function(res) {
            cb(res);
        });
    }
}

module.exports = burger;