const express = require("express");
const mongoConnect = require("./db");
const app = express();
const port = 5000;
const cors = require("cors");
require("./db");

//! Using cors
app.use(cors());

//! Connecting MongoDB
mongoConnect();

//! To use json data
app.use(express.json());

//! Available Routes
app.use("/api", require("./routes/userAuth.js"));
app.use("/api", require("./routes/fetchData.js"));
app.use("/api", require("./routes/orderData.js"));

app.get("/", (req, res) => {
  res.send("Hello Express...!");
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});
