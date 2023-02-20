const express = require("express");
const router = express.Router();

router.post("/fetchFoodData", async (req, res) => {
  try {
    res.send([global.foodItem, global.foodCategory]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

module.exports = router;