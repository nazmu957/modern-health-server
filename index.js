const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb'); 



const port = process.env.PORT || 8009;

// user: mydbuser1
//pass: KrZZItRAuEVdXd9l


// const uri = "mongodb+srv://mydbuser1:KrZZItRAuEVdXd9l@cluster0.bwva2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log('Hitting the database');
 
//   client.close();
// });

  
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bwva2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
      try{
          await client.connect();
          const database = client.db('modern_health_service');
          const appointmentsCollection = database.collection('appointments');

          app.post('/appointments', async (req, res) => {
                const appointment = req.body;
                const result = await appointmentsCollection.insertOne(appointment);
                console.log(result);
                res.json(result)
          });
          
      }
      finally{
            // await client.close();
      }
}

run().catch(console.dir);
 

app.get('/', (req, res) => {
  res.send('Modern Health Tecnology')
})

app.listen(port, () => {
  console.log(`listening at ${port}`)
})   

          // app.get('/users')
          // app.post('/users')
          // app.get('/users/:id')
          // app.put('/users/:id');
          // app.delete('/users/:id')