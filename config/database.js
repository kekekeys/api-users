const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://KayZ:kekekeysZw@kayz.njeqifu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
    if (err) throw err;
});

const collection = client.db("happyKiwi").collection("users");

module.exports = { collection, ObjectId }