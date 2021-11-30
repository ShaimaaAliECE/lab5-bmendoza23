const express   = require ('express');
let jobs        = require ('./jobs.json');

const app = express();

//Serving Static
app.use(express.static('static'));