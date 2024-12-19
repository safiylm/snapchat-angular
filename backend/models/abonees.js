var mongoose = require('mongoose');
const User = require("../models/user");

//MODEL ABONNEE 

const Abonee = new mongoose.Schema({

    usedId: { type: String },
    followers: [ String ],
   
}, { versionKey: false });

mongoose.model('Abonee', Abonee);

module.exports = Abonee;
