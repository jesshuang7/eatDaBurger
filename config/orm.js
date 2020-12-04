var connection = require("./connection.js");

// Object Relational Mapper (ORM)
// orm is sort of like javacript to database
// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
// https://en.wikipedia.org/wiki/SQL_injection

// Taken from Class Activty 16 MVC example

// Helper function for SQL syntax.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}


const orm = {
  selectAll: function(tableInput, cb){
    let queryString = "SELECT * FROM " + tableInput + ";";
    // let queryString = "SELECT * FROM burgers";
    connection.query(queryString, function(err, result){
      if (err) throw err;
      cb (result);
    })
  },
  insertOne: function(table, cols, vals, cb){
    let queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result){
      if (err) throw err;
      cb (result);
    })
  },
  // insertOne: function(burgerName, cb){
  //    let queryString = "INSERT INTO burgers (burger_name, devoured) VALUES (" + burgerName + ", FALSE)";
  //   connection.query(queryString, function(err, result){
  //     if (err) throw err;
  //     cb (result);
  //   })
  // },
  updateOne: function(table, objColVals, condition, cb){
    let queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result){
      if (err) throw err;
      cb (result);
    })
  },
  // updateOne: function(burgerStatus, burgerId, cb){
  //   let queryString = "UPDATE burgers SET devoured = " + burgerStatus + " WHERE id = " + burgerId;
  //   connection.query(queryString, function(err, result){
  //     if (err) throw err;
  //     cb (result);
  //   })
  // }
};

module.exports = orm;
