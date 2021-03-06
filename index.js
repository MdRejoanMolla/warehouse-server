const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const jwt = require('jsonwebtoken')
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mpwi2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
      try {
            await client.connect();
            const itemCollection = client.db("bike-warehouse").collection("manage-items");

            app.post('/login', async (req, res) => {
                  const user = req.body;
                  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: '1d'
                  });
                  res.send({ accessToken });
            })

            app.get('/manageItem', async (req, res) => {
                  const query = {};
                  const cursor = itemCollection.find(query);
                  const manages = await cursor.toArray();
                  res.send(manages);
            })
            app.get('/manageItem', async (req, res) => {
                  const email = res.query.email;

                  const query = { email: email };
                  const cursor = itemCollection.find(query);
                  const myItem = await cursor.toArray();
                  res.send(myItem);
            })

            app.post('/manageItem', async (req, res) => {
                  const newItem = req.body;
                  const result = await itemCollection.insertOne(newItem);
                  res.send(result);
            })
            app.post('/manageItem', async (req, res) => {
                  const newItem = req.body;
                  const result = await itemCollection.updateOne(newItem);
                  res.send(result);
            })

            app.get('/manageItem/:id', async (req, res) => {
                  const id = req.params.id;
                  const query = { _id: ObjectId(id) }
                  const item = await itemCollection.findOne(query);
                  res.send(item)
            })

            // delete
            app.delete('/manageItem/:id', async (req, res) => {
                  const id = req.params.id;
                  const query = { _id: ObjectId(id) };
                  const result = await itemCollection.deleteOne(query);
                  res.send(result);
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