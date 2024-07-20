const db = require('../config/db.config.js');
const collection_interactionsociales = db.collection('interactionsociales');
const ObjectId = require('mongodb').ObjectId;
const collection_statistiqueusers = db.collection('statistiqueusers')

exports.create = (req, res) => {

  // Validate request
  // if (!req.body.postId) {
  //   res.status(400).send({ message: "Content can not be empty!" });
  //   return;
  // }

  // Create a Tutorial
  const is1 = {
    postId: req.body.postId,
    comments: req.body.comments,
    likes: req.body.likes,
    points: req.body.points,
  };

  // Save Tutorial in the database
  collection_interactionsociales
    .insertOne(is1)
    .then(data => {
      res.set('Access-Control-Allow-Origin', '*');
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

exports.pointsRemove = async (req, res) => {

  const updateResult = await collection_interactionsociales.updateOne({ "_id": new ObjectId(req.body._id) },
    {
      $set: { "pointedBy_": [""] },
      $inc: { "points": -1 }
    },true
  ).then(data => {
    collection_statistiqueusers.updateOne({ "userId": data.userId },
      { $inc: { "totalPosts": -1 } }) 
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while add like."
        })
      });

  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while remove point."
      })
    });

  res.set('Access-Control-Allow-Origin', '*');
  res.send(updateResult);

};

exports.pointsAdd = async (req, res) => {

  const updateResult = await collection_interactionsociales.updateOne({ "_id": new ObjectId(req.body._id) },
    {
      $set: { "pointedBy_": [req.body.userId] },
      $inc: { "points": 1 }
    }, true
  ).then(data => {
    collection_statistiqueusers.updateOne({ "userId": data.userId },
      { $inc: { "totalPosts": 1 } }) 
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while add like."
        })
      });

  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while add point."
      })
    });

  res.set('Access-Control-Allow-Origin', '*');
  res.send(updateResult);

};

exports.likesAdd = async (req, res) => {

  const updateResult = await collection_interactionsociales.update({ "_id": new ObjectId(req.body._id) },
    {
      $inc: { "likes": 1 },
      $set: { "likedBy_": [req.body.userId] }
    },true
  )
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while add like."
      })
    });
  res.set('Access-Control-Allow-Origin', '*');
  res.send(updateResult);

};

exports.likesRemove = async (req, res) => {

  const updateResult = await collection_interactionsociales.updateOne({ "_id": new ObjectId(req.body._id) },
    {
      $set: { "likedBy_": [""] },
      $inc: { "likes": -1 }
    },true
  )
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while remove likes."
      })
    });
  res.set('Access-Control-Allow-Origin', '*');
  res.send(updateResult);

};

exports.findByPublicationId = async (req, res) => {

  const id = req.query.id;
  res.set('Access-Control-Allow-Origin', '*');
  res.send(await collection_interactionsociales.findOne({ "postId": id }))
};

