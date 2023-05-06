const mongodb = require('../db/connect');
const mongo = require('mongodb')

index = (req, res) => {
  res.send("Mickey McCrary");
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
  const contact = await collection.findOne({
    _id: new mongo.ObjectId(id)
  });

  if (!contact) {
    res.status(404).send('Contact not found');
  } else {
    res.send(contact);
  }
};

const insert = async (req, res) => {
  const db = mongodb.getDb();
  const collection = db.db('cse341').collection('contacts');

  const requiredFields = ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'];
  const missingFields = requiredFields.filter(field => !req.body[field]);

  if (missingFields.length > 0) {
    res.status(400).send(`Missing fields: ${missingFields.join(', ')}`);
    return;
  }

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
    res.status(201).send('Document inserted. ID = ' + result.insertedId);
  }
};

const updateById = async (req, res) => {
  const db = mongodb.getDb();
  const collection = db.db('cse341').collection('contacts');

  const id = String(req.params.id);
  const contact = await collection.findOne({
    _id: new mongo.ObjectId(id)
  });

  if (!contact) {
    res.status(404).send('Contact not found');
    return;
  }

  const fieldsToUpdate = Object.keys(req.body);
  const validFields = ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'];

  const canUpdate = fieldsToUpdate.every(field => validFields.includes(field));
  if (!canUpdate) {
    const invalidFields = fieldsToUpdate.filter(field => !validFields.includes(field));
    res.status(400).send(`Invalid fields: ${invalidFields.join(', ')}`);
    return;
  }

  const updateValues = {};
  fieldsToUpdate.forEach(field => {
    updateValues[field] = req.body[field];
  });

  const result = await collection.updateOne({
    _id: new mongo.ObjectId(id)
  }, {
    $set: updateValues
  });

  if (!result.acknowledged) {
    console.log(err);
    res.status(500).send('Error updating document');
  } else {
    res.status(204).send('Document Updated');
  }
};

const deleteById = async (req, res) => {
  const db = mongodb.getDb();
  const collection = db.db('cse341').collection('contacts');

  const id = String(req.params.id);

  const result = await collection.deleteOne({
    _id: new mongo.ObjectId(id)
  });

  if (result.deletedCount === 0) {
    res.status(404).send('Contact not found');
  } else {
    res.status(200).send('Contact deleted');
  }
};



module.exports = {
  index,
  insert,
  getAll,
  getById,
  updateById,
  deleteById
}