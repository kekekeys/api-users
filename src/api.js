const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
const { collection, ObjectId } = require("../config/database");

const app = express();
const router = express.Router();

app.use(cors());

const bodyParser = require("body-parser");
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

router.get("/", (req, res) => {
    collection.find().toArray((err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

router.post("/", (req, res) => {
    collection.insertOne(req.body, (err, result) => {
        if (err) throw err;
        res.send(result.insertedId);
    });
});

router
    .route("/:id")
    .get((req, res) => {
        const query = {
            _id: ObjectId(req.params.id),
        };
        collection.findOne(query, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    })
    .put((req, res) => {
        const query = { _id: ObjectId(req.params.id) };
        let newvalues = { $set: req.body };
        collection.updateOne(query, newvalues, (err, result) => {
            if (err) throw err;
        });
        res.send("1 document updated.");
    })
    .delete((req, res) => {
        const query = { _id: ObjectId(req.params.id) };
        collection.deleteOne(query, (err, result) => {
            if (err) throw err;
        });
        res.send("1 document deleted.");
    });

app.use("/.netlify/functions/api", router);
module.exports.handler = serverless(app);