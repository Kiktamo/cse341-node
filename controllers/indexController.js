const mongodb = require('../db/connect');
const mongo = require('mongodb')

index = (req, res) => {
  res.send("Mickey McCrary");
};

const insert = async (req, res) => {
  const db = mongodb.getDb();
  const collection = db.db('cse341').collection('contacts');

  const {
    firstName,
    lastName,
    email,
    favoriteColor,
    birthday
  } = req.body;
  const document = {
    firstName,
    lastName,
    email,
    favoriteColor,
    birthday: new Date(birthday)
  };

  const result = await collection.insertOne(document);
  if (!result.acknowledged) {
    console.log(err);
    res.status(500).send('Error inserting document');
  } else {
    res.send('Document inserted');
  }
};

const getAll = async (req, res) => {
  const db = mongodb.getDb();
  const collection = db.db('cse341').collection('contacts');
  const documents = await collection.find().toArray();
  res.send(documents);
};

const getById = async (req, res) => {
  const db = mongodb.getDb();
  const collection = db.db('cse341').collection('contacts');

  const id = String(req.params.id);
  const contact = await collection.findOne({ _id: new mongo.ObjectId(id)});

  if (!contact) {
    res.status(404).send('Contact not found');
  } else {
    res.send(contact);
  }
};

module.exports = {
  index,
  insert,
  getAll,
  getById
}