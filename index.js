const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();

app.get("/", (req, res) => {
      res.send('running my node crud server')
})
app.use(cors());
app.use(express.json());

app.listen(port, () => {
      console.log('card server is running')
})