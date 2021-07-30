const express = require("express");
const constants = require("./constants");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());

var port = process.env.PORT || 5000;

app.use(express.json());

//All Routes
app.use("/api/user", require("./routes/user"));
app.use("/api/property", require("./routes/property"));

mongoose
  .connect(constants.uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTED TO DATABASE!");
  })
  .catch(() => {
    console.log("DATABASE CONNECTION FAILED!");
  });

app.listen(port, () => {
  console.log(`server started listning on port ${port}!`);
});
