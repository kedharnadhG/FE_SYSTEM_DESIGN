const express = require("express");
const app = express();

let data = "Initial Data";

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/getData", (req, res) => {
  //we'll leverage/get this data from the database/server (for real-time data), but for now we'll just send some dummy data from in-memory
  res.send({
    data,
  });
});

// Use post/put to update the data
//to leverage the data from the database/server (so that it can be updated in real-time , so that the client can get the updated data)
app.get("/updateData", (req, res) => {
  data = "Updated Data";
  res.send({
    data,
  });
});

const port = process.env.PORT || 5011;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
