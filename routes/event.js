const express = require("express");
const router = express.Router();

const EventController = require("../controaller/eventControal");

// router.get("/", authenticate, EventController.index);

router.get("/",EventController.index);
router.post("/show", EventController.show);
router.post("/store", EventController.store);
router.post("/update", EventController.update);
router.delete("/delete/:id", EventController.destroy);

module.exports = router;
