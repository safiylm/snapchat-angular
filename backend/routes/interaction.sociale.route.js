const interactionsociales = require("../controllers/interaction.sociale.controller.js");

var router_interactionsociales = require("express").Router();

// Create a new User
//router_publication.post("/api/publication", interactionsociales.create);
router_interactionsociales.post("/api/interaction/social/create", interactionsociales.create);

router_interactionsociales.get("/api/interactionSocialByPostId", interactionsociales.findByPublicationId);

router_interactionsociales.put( "/api/interaction/social/points/add", interactionsociales.pointsAdd )
router_interactionsociales.put( "/api/interaction/social/points/remove", interactionsociales.pointsRemove )

router_interactionsociales.put( "/api/interaction/social/likes/add", interactionsociales.likesAdd )
router_interactionsociales.put( "/api/interaction/social/likes/remove", interactionsociales.likesRemove )

module.exports = router_interactionsociales;

// interaction.sociale.route