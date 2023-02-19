const express = require("express");
const router = express.Router();

router.post("/foodData", async (req, res) => {
  try {
    console.log([global.foodItems, global.foodCategory]);
    res.send([global.foodItems, global.foodCategory]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

module.exports = router;
