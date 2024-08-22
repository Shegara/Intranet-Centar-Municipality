require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/users");
const docsRoute = require("./routes/docs");
const servicesRoute = require("./routes/services");


const app = express();
const port = process.env.PORT || 8800;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", userRoute);
app.use("/api/docs", docsRoute);
app.use("/api/services", servicesRoute);

app.get("/", (req, res) => {
  res.send("Server is running and connected to the PostgreSQL database.");
});

app.listen(port, () => {
  console.log(`Server is successfully running at http://localhost:${port}`);
});
