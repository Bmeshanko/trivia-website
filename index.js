const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')
const {request, response} = require("express");

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin",
        "http://localhost:4200");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/countries', db.getCountries)
app.get('/population/:id', db.getPopulation)
app.get('/gdp/:id', db.getGDP)
app.get('/area/:id', db.getArea)
app.get('/carbon/:id', db.getCarbon)
app.get('/capital/:id', db.getCapital)
app.get('/highscore/:correct/:total', db.postHighScore)
