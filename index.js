require("dotenv").config()
const express = require("express")
const { json } = require("body-parser")
const massive = require("massive")
const controller = require("./products_controller")

const app = express()
//whenever using massive it must be invoked using the following syntax. CONNECTION_STRING is a variable created in the .env file
massive(process.env.CONNECTION_STRING)
  //take the db returned by the CONNECTION_STRING URL and set 'db' to always reference it across our app
  //console.log that the database is connected.
  .then(db => {
    app.set("db", db)
    console.log("database connected")
  })
  //include a catch. this will mostly tell us if we have forgotten to add ?ssl=true to the end of our database url
  .catch(err => {
    console.log("could not connect to db")
  })
app.use(json())
//our endpoints redirect to our controller file
app.get("/api/products", controller.getAll)
app.get("/api/products/:id", controller.getOne)
app.put("/api/products/:id", controller.update)
app.post("/api/products", controller.create)
app.delete("/api/products/:id", controller.delete)

//since port was defined in .env we can relabel it here. This is a good habit to have here for later on when
//publishing get incorporated
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log("listening on 3000")
})
