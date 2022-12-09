const express = require("express");
const router = express.Router();


const researchController = require('../controaller/ResearchController')

router.get("/", researchController.index);
router.post("/addResearch", researchController.addResearch);
router.delete("/delete/:id", researchController.destroy);

module.exports = router;
