var jsf = require('json-schema-faker');
var mockDataSchema = require('./schema');
var fs = require('fs');
var faker = require('faker')

jsf.option({
  useDefaultValue: true
})

jsf.extend('faker', () => { return faker })

jsf.format('soon', () => faker.date.past())

var json = JSON.stringify(jsf.generate(mockDataSchema));

fs.writeFile("./db.json", json, function (err) {
  if (err) {
    return console.log(err);
  } else {
    console.log("Mock data generated.");
  }
});