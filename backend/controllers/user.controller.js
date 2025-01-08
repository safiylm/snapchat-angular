const User = require("../models/user");
const db = require('../config/db.config.js')
const collection_user = db.collection('users');
const collection_statistiqueusers = db.collection('statistiqueusers');
const collection_abonnees = db.collection('abonnees');
const nodemailer = require('nodemailer');
const ObjectId = require('mongodb').ObjectId;
const jwt = require('../jwt.js')

const transporter = nodemailer.createTransport({
  service: 'gmail', // ou autre fournisseur
  auth: {
    user: 'snapface2023@gmail.com',
    pass: 'rdez jsdy ehbq zvkn', // Utilisez un mot de passe d'application si requis
  },
});


//create new user
exports.create = (req, res) => {

  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    photos_profil: req.body.photos_profil,
    photos_background: req.body.photos_background,
    password: req.body.password,
    email: req.body.email,
    phoneNo: req.body.phoneNo,
  }

  res.set('Access-Control-Allow-Origin', '*');

  // Save Tutorial in the database
  collection_user
    .insertOne(user)
    .then(data => {
      collection_statistiqueusers
        .insertOne({
          userId: data.insertedId.toString(),
          followers: 0,
          totalPosts: 0,
          totalPoints: 0,
        })
        .then(data1 => {
          collection_abonnees
            .insertOne({

              userId: data.insertedId.toString(),
              followers: []
            })
            .then(data3 => {
              res.send(data3);
            })
        })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });

};



//edit user data
exports.update = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const updateResult = await collection_user.updateOne({ "_id": new ObjectId(req.body._id) },
    {
      $set: {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "photos_profil": req.body.photos_profil,
        "photos_background": req.body.photos_background,
      }
    });
  res.send(updateResult);
}


exports.editEmail = async function (req, res) {
  res.set('Access-Control-Allow-Origin', '*');

  await collection_user.updateOne({ "_id": new ObjectId(req.body._id) },
    {
      $set: {
        "email": req.body.email,
      }
    }).then(data => {
      if (data) {

        const mailOptions = {
          from: 'snapface2023@gmail.com',
          to: "safinazyilmaz54@gmail.com",
          subject: "Email Modifier",
          text: "Email Modifier",
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return res.status(500).send({ success: false, error });
          }

          res.status(200).send(data);
          // res.status(200).send({ success: true, message: 'Email envoyé avec succès !' });
        });

      }

    })

}


exports.editPhoneNumber = async function (req, res) {
  res.set('Access-Control-Allow-Origin', '*');

  const updateResult = await collection_user.updateOne({ "_id": new ObjectId(req.body._id) },
    {
      $set: {
        "phoneNo": req.body.phoneNo,
      }
    });
  res.send(updateResult);
}

//edit password
exports.editPassword = async function (req, res) {
  res.set('Access-Control-Allow-Origin', '*');

  const updateResult = await collection_user.updateOne({ "_id": new ObjectId(req.body._id) },
    {
      $set: {
        "password": req.body.newpassword,
      }
    });
  res.send(updateResult);
}


//dete user 
exports.delete = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const deleteResult = await collection_user.deleteOne({ "_id": new ObjectId(req.body.id) });
  res.send(deleteResult);

}



// Retrieve all Users from the database.
exports.findAll = async (req, res) => {

  res.set('Access-Control-Allow-Origin', '*');

  const findResult = await collection_user.find({}).toArray();
  res.send(findResult);

}


// Retrieve one User by id from the database.
exports.findOneById = async (req, res) => {

  const id = req.query.id;
  res.set('Access-Control-Allow-Origin', '*');
  res.send(await collection_user.findOne({ "_id": new ObjectId(id) }))
};


//connexion
exports.connexion = async function (req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Credentials', 'true');
  res.set('Access-Control-Allow-Methods', 'GET, POST,  OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type')
  res.send(await collection_user.findOne({ "email": req.body.email }));
};


exports.sendLinkForPasswordOublie = async function (req, res) {

  const userEmail = req.body.email;
  const resetLink = jwt.generateResetLink(userEmail);


  const mailOptions = {
    from: 'snapface2023@gmail.com',
    to: "safinazylm@gmail.com",
    subject: 'Réinitialisation de votre mot de passe',
    html: `<p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
           <a href="${resetLink}">Réinitialiser le mot de passe</a>
           <p>Ce lien expirera dans 1 heure.</p>`,
  };


  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Erreur lors de l\'envoi de l\'e-mail :', err);
    } else {
      res.set('Access-Control-Allow-Origin', '*');
      res.send('E-mail envoyé :', info.response)
    }
  });
}


exports.getIfEmailExist = async function (req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  collection_user.findOne({ "email": req.body.email }).then(data => {
    res.send(data)
  })
}

//edit password
exports.reinitialisePassword = async function (req, res) {
  res.set('Access-Control-Allow-Origin', '*');

  const token = jwt.verifyResetLink(req.body.token);
  
  await collection_user.updateOne({ "email": token },
    {
      $set: {
        "password": req.body.password,
      }
    }).then(data => {
      res.send(data);
    })
}