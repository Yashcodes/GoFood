const mongoose = require("mongoose");

const Order = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  order_data: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("order", Order);
