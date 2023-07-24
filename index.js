const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;


//middleware
app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mhsnbkd.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // const classesCollection = client.db("sports").collection("classesCollection");
    const userCollection = client.db('admitJet').collection("user");
    const collegesCollection = client.db('admitJet').collection("colleges")
    const picturesCollection = client.db('admitJet').collection("pictures")


    //users APIS here
    app.get('/user', async (req, res) => {
        // const query = req.query.email
        // console.log(query);
        const result = await userCollection.find().toArray();
        res.send(result)
      })

    app.post('/user', async(req, res) =>{
        const user = req.body;
        const result = await userCollection.insertOne(user);
        res.send(result);
    })

    // colleges APIS here
    app.get('/colleges', async(req, res) =>{
      const result = await collegesCollection.find().toArray();
      res.send(result);
    })

    app.get('/colleges/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await collegesCollection.findOne(query);
      res.send(result);
    })

    // pictures apis here
    app.get('/pictures', async(req, res) =>{
      const result = await picturesCollection.find().toArray();
      res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('admit jst is running')
})

app.listen(port, () =>{
    console.log(`admit jet is running on port ${port}`)
})