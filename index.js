const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();

// userdb1
// DYbfZeKy2RiQ9nv3


const uri = `mongodb+srv:// ${process.env.DB_USER}:${process.env.DB_pass}@cluster0.mpwi2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
      const collection = client.db("test").collection("devices");
      // perform actions on the collection object
      console.log('bd connected')
      client.close();
});




app.get("/", (req, res) => {
      res.send('running my node crud server')
})
app.use(cors());
app.use(express.json());

app.listen(port, () => {
      console.log('card server is running', port);
})