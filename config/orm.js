var connection = require("./connection.js");

// Object Relational Mapper (ORM)

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
// https://en.wikipedia.org/wiki/SQL_injection
const orm = {
  selectAll: function(table){
    let queryString = "SELECT * FROM " + table + ";";
    connection.query(queryString, function(err, result){
      if (err) throw err;
      console.log(result);
    })
  },
  insertOne: function(burgerName){
    // table, cols, vals
    // let queryString = "INSERT INTO" + table + " (" + cols.toString() + ") " + "VALUES (" + printQuestionMarks(vals.length) + ") ";
   let queryString = "INSERT INTO burgers (burger_name, devoured) VALUES (" + burgerName + ", FALSE)";
    connection.query(queryString, function(err, result){
      if (err) throw err;
      console.log(result);
    })
  },
  updateOne: function(burgerStatus, burgerId){
    let queryString = "UPDATE burgers SET devoured = " + burgerStatus + " WHERE id = " + burgerId;
    connection.query(queryString, function(err, result){
      if (err) throw err;

      console.log(result);
    })
  }
};

module.exports = orm;
