const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mpwi2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
      try {
            await client.connect();
            const itemCollection = client.db("bike-warehouse").collection("manage-items");
            app.get('/manageItem', async (req, res) => {
                  const query = {};
                  const cursor = itemCollection.find(query);
                  const manages = await cursor.toArray();
                  res.send(manages);
            })

      }
      finally {

      }

}

run().catch(console.dir)
app.get("/", (req, res) => {
      res.send('running my node crud server')
})
app.use(cors());
app.use(express.json());

app.listen(port, () => {
      console.log('card server is running', port);
})