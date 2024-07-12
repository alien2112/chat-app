const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
//const app = express();
require("dotenv").config();
const router = require('./routes/index');
const cookiesParser = require("cookie-parser");

const {app,server} = require('./socket/index');


app.use(cors());
app.use(express.json());
app.use(cookiesParser());
const port = process.env.port || 3000;

//api endpoints
app.get('/',(req,res)=>res.send('Express on Railway with server.js!'));
app.use('/api/v1',router);


server.listen(port, () => {
  db();
  console.log("listening on port at ",port);
});
