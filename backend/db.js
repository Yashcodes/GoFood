const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://yash:goFood2023@cluster0.9vaouyv.mongodb.net/gofoodmern";

const mongoConnect = () => {
  mongoose.set("strictQuery", false);

  mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("MongoDB Connected Successfully");

      const fetched_data = mongoose.connection.db.collection("foodItems");
      fetched_data.find({}).toArray((err, data) => {
        const foodCategory = mongoose.connection.db.collection("foodCategory");

        foodCategory.find({}).toArray((err, categoryData) => {
          if (err) {
            console.log(err);
          } else {
            global.foodItem = data;
            global.foodCategory = categoryData;
          }
        });
      });
    }
  });
};

// const Food = new mongoose.Schema({});

// const food = mongoose.model("food", Food);

module.exports = mongoConnect;
